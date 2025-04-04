# Contributing

This guide provides instructions for contributing to this Capacitor plugin.

## Developing

### Local Setup

1. Fork and clone the repo.
1. Install the dependencies.

   ```shell
   npm install
   ```

1. Install SwiftLint if you're on macOS.

   ```shell
   brew install swiftlint
   ```

### Scripts

#### `npm run build`

Build the plugin web assets and generate plugin API documentation using [`@capacitor/docgen`](https://github.com/ionic-team/capacitor-docgen).

It will compile the TypeScript code from `src/` into ESM JavaScript in `dist/esm/`. These files are used in apps with bundlers when your plugin is imported.

Then, Rollup will bundle the code into a single file at `dist/plugin.js`. This file is used in apps without bundlers by including it as a script in `index.html`.

#### `npm run verify`

Build and validate the web and native projects.

This is useful to run in CI to verify that the plugin builds for all platforms.

#### `npm run lint` / `npm run fmt`

Check formatting and code quality, autoformat/autofix if possible.

This template is integrated with ESLint, Prettier, and SwiftLint. Using these tools is completely optional, but the [Capacitor Community](https://github.com/capacitor-community/) strives to have consistent code style and structure for easier cooperation.

## Publishing

There is a `prepublishOnly` hook in `package.json` which prepares the plugin before publishing, so all you need to do is run:

```shell
npm publish
```

> **Note**: The [`files`](https://docs.npmjs.com/cli/v7/configuring-npm/package-json#files) array in `package.json` specifies which files get published. If you rename files/directories or add files elsewhere, you may need to update it.

# Environment Variables

Since Ionic is built on top of Angular, in example porject used an embedded mechanism for managing environment variables. The official doc is [here](https://v17.angular.io/guide/build).

## How to use environment variables?

- create folder `environments` in `src` folder. Ex: `example-app/src/environments/environment.ts`
- in `environment.ts` define all environments variables:

```typescript
export const environment = {
  IONIC_API_KEY: 'site-api-key',
  IONIC_API_SECRET: 'site-api-secret',
  IONIC_SITE_ID: 'site-identifier',
  IONIC_QUEUE_ID: 'queue-identifier',
  IONIC_REGION: 'beta',
  IONIC_COMPANY_NAME: 'IonicCompany',
};
```

After environment variables are defined:

- open `example-app` folder
- run `npm run build`
- run `npx cap sync`

## Troubleshooting

To be sure that environment variables applied correctly please open `public` folder and find `index-#{some_hash}.js` file. If variables applied correctly your should see something like this:
![image](/image/406754853-aff92ca8-14e1-4ba3-a89c-c20569880d55.png)
![image](/image/406755039-3cf54cb1-fb3c-4eab-a494-3c92cb13cbfa.png)

## To run application:

- open platform folder `ios` or `android`
- open IDE
- run project
