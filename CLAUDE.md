# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## What this repo is

`@salemove/widgets_sdk_ionic` is a Capacitor plugin that wraps the native GliaWidgets SDKs (iOS Swift, Android Java) and exposes them to Ionic/Capacitor apps via a TypeScript API. Published to GitHub Packages.

## Commands

```bash
npm run build          # docgen → tsc → rollup → dist/
npm run lint           # ESLint + Prettier check + SwiftLint
npm run fmt            # Auto-fix all three
npm run verify:web     # TypeScript build only
npm run verify:android # cd android && ./gradlew clean build test
npm run verify:ios     # xcodebuild -scheme GliaWidgetsIonic -destination generic/platform=iOS

# Update native dependency versions (CI also has workflows for these)
cd android && ./gradlew glia-widgets-ionic:saveGliaAndroidWidgetsSdkVersion --sdkVersion=X.Y.Z
cd android && ./gradlew glia-widgets-ionic:saveGliaTelemetryLibVersion --sdkVersion=X.Y.Z
```

## Architecture

Three layers. TypeScript is the public surface; both native layers are thin wrappers around the real GliaWidgets SDKs.

```
src/                          TypeScript API + Capacitor bridge
ios/Sources/GliaSdkPlugin/    Swift (GliaWidgets pod)
android/src/main/java/        Java (com.glia:android-widgets)
example-app/                  Vite test app, not published
```

### TypeScript layer (`src/`)

`definitions.ts` defines the public `GliaSdk` interface and all types. `glia-sdk.ts` implements it in `GliaSdkImpl`, which calls through to the native Capacitor plugin registered as `'GliaSdk'`. `index.ts` exports a singleton instance.

Key non-obvious transforms in `glia-sdk.ts`:

- **`authorizationMethod`** — the TS union type (`SiteApiKey | UserApiKey`) is mapped to `{ type, id, secret }` before being passed to native. The legacy `apiKey` field is also up-converted to this shape.
- **`uiUnifiedConfig`** — if it's a JS object, it's `JSON.stringify`'d before calling native (native expects a string).
- **`useOptions: true` sentinel** — `startChat`, `startAudio`, `startVideo`, and `showEntryWidget` inject `useOptions: true` into the options object before calling native. The native side uses this flag to decide whether to use the call's `queueIds` or fall back to the `queueIds` captured at `configure()` time. Never remove this flag when editing those methods.
- **Primitive return unwrapping** — Capacitor can't resolve a promise with a bare primitive. Methods that return one use a wrapper object on the native side (e.g., `{ isAuthenticated: bool }`) and unwrap it in `GliaSdkImpl` (e.g., `isAuthenticatedInternal()` → `.isAuthenticated`).
- **Unread message count** — a single native listener for `gliaWidgetsUnreadMessageCountChanged` is registered in the `GliaSdkImpl` constructor and fans out to a JS `Set` of callbacks. `subscribeToUnreadMessageCount` / `unsubscribeFromUnreadMessageCount` are JS-only; there are no corresponding native plugin methods.

### iOS (`ios/Sources/GliaSdkPlugin/`)

`GliaSdkPlugin.swift` is a pure thin wrapper: it declares `pluginMethods` and `@objc` bridge methods, each of which does nothing but call into `GliaSdk.swift`. Logic lives exclusively in `GliaSdk.swift`.

All UIKit calls in `GliaSdk.swift` must be dispatched to `DispatchQueue.main.async`.

The iOS dependency version is declared in **two places that must be kept in sync**:
- `GliaWidgetsIonic.podspec` — `s.dependency 'GliaWidgets', '<version>'`
- `Package.swift` — `.package(url: "...", exact: "<version>")`

After bumping the podspec version, run `bundle exec pod update GliaWidgets` from `example-app/ios/App` to update the lock file.

### Android (`android/src/main/java/com/glia/widgets/ionic/`)

Same split: `GliaSdkPlugin.java` is a thin `@CapacitorPlugin` wrapper; logic lives in `GliaSdk.java`.

Android dependency versions live in `android/version.properties`, **not** in `package.json`. The `version-updater.gradle` script exposes the Gradle tasks listed above to update them.

### Example app (`example-app/`)

References the SDK locally via `"glia-widgets-ionic": "file:.."`. The credentials file is gitignored — create it before running:

```typescript
// example-app/src/environments/environment.ts
export const environment = {
  IONIC_API_KEY: 'your-key-id',
  IONIC_API_SECRET: 'your-key-secret',
  IONIC_SITE_ID: 'your-site-id',
  IONIC_REGION: 'us',
  IONIC_COMPANY_NAME: 'YourCompany',
};
```

After creating it: `npm run build` (root) → `cd example-app && npm install --legacy-peer-deps && npm run build && npx cap sync`.

**iOS pod operations must use `bundle exec`** — always run `bundle exec pod install` / `bundle exec pod update` from inside `example-app/`, never bare `pod`. The `Gemfile` pins CocoaPods, xcodeproj, and activesupport to versions known to work; bare `pod` silently picks up whatever is installed globally.

### Ruby Podfile scripts (`scripts/`)

The root `scripts/` directory contains two Ruby helpers that are sourced by the example app's `Podfile`:

- `glia_sdk_linkage_hook.rb` — forces `GliaWidgets`, `GliaCoreSDK`, `GliaCoreDependency`, `GliaOpenTelemetry`, `PhoenixChannelsClient`, `TwilioVoice`, and `WebRTC-lib` to build as dynamic frameworks.
- `open_telemetry.rb` — forces the four `OpenTelemetry-Swift-*` pods to build as dynamic frameworks.

These exist because CocoaPods would otherwise build some of these as static libraries, which breaks at link time. If iOS builds fail with unusual linker errors after a pod update, check whether a new transitive dependency also needs to be added to one of these lists.

## Adding a new public API method

Changes are required in 6 files across 3 languages. Missing any one breaks the method silently or at runtime.

1. **`src/definitions.ts`** — add to the `GliaSdk` interface. The `docgen` step (`npm run build`) only picks up types reachable from this interface; new types must be referenced here.
2. **`src/glia-sdk.ts`** — implement in `GliaSdkImpl`, call through to `GliaSdkIonicPlugin`. If the method returns a primitive, use a wrapper object and unwrap the result (see `isAuthenticated` / `isAuthenticatedInternal` as the pattern).
3. **`ios/Sources/GliaSdkPlugin/GliaSdkPlugin.swift`** — add a `CAPPluginMethod` entry to `pluginMethods` and a corresponding `@objc` method that delegates to `implementation`.
4. **`ios/Sources/GliaSdkPlugin/GliaSdk.swift`** — add the `@objc public func` implementation. Dispatch UI work to `DispatchQueue.main.async`. Resolve with `call.resolve()` or `call.resolve([key: value])`; reject with `call.reject(message)`.
5. **`android/.../GliaSdkPlugin.java`** — add `@PluginMethod public void methodName(PluginCall call)` delegating to `implementation`.
6. **`android/.../GliaSdk.java`** — add the implementation. Resolve via `call.resolve(new JSObject().put(key, value))` or plain `call.resolve()`.

### Adding a new native event (subscription)

The unread message count is the reference implementation. The pattern:
- **Native (both platforms)**: after a triggering condition, call `eventEmitter.notify("eventName", params)` (Android) or `self?.eventEmitter?("eventName", data)` (iOS).
- **TypeScript**: in the `GliaSdkImpl` constructor, register one `GliaSdkIonicPlugin.addListener("eventName", ...)` and fan out to a user-facing `Set` of callbacks. Expose `subscribeToX` / `unsubscribeFromX` methods on the interface — these are JS-only and require no native plugin method entry.

## Conventions

**Deprecated method aliases** — every deprecated method simply delegates to its replacement without any branching. When adding a new method that supersedes an old one, keep the old method as a one-liner delegate and mark it `@Deprecated` / `@deprecated`. Never duplicate logic.

**Pre-commit hook** — Lefthook runs `.git-hooks/pre-commit` (security scan) on every commit. Disabled in CI via `LEFTHOOK=0`.

**Version PRs** — all CI workflows that bump native SDK versions or the project version open PRs targeting the `development` branch, not `master`.
