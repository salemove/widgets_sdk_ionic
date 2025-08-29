# Glia Widgets Ionic

GliaWidgets SDK is a simple and customisable framework built on top of GliaSDK. It provides all the necessary UI components to quickly integrate GliaSDK into your project.

## Changelog

### 3.1.2

Updated underlying SDKs:
- [Android Widgets SDK v3.1.2](#android-widgets-sdk-v312)
- [iOS Widgets SDK v3.1.2](#ios-widgets-sdk-v312)

#### Android Widgets SDK v3.1.2
##### Fixed
- Corrected an error where cached locale strings failed to receive updates depending on the device's time zone relative to UTC. Locale strings now update immediately on device restart.

#### iOS Widgets SDK v3.1.2
##### Fixed
- The visitor survey now opens correctly after ending a chat.

### 3.1.1

#### Added
- Added support for push notifications.
- Several new methods are now available: `showEntryWidget()`, `hideEntryWidget()`, `startSecureMessaging()`, `getQueues()`, `showVisitorCode()`, `getVisitorInfo()`, `updateVisitorInfo()`, `endEngagement()`, `subscribeToPushNotificationTypes()`.

#### Changed
- The `configure` method now includes several new parameters.
- The `startChat()`, `startAudio()`, and `startVideo()` methods have a new optional `queueIds` parameter.
- The `deauthenticate()` method now includes a new `stopPushNotifications` parameter.
- The following methods are now deprecated:
  - `presentEntryWidget()` - Please use `showEntryWidget()` instead.
  - `startSecureConversation()` - Please use `startSecureMessaging()` instead.
  - `listQueues()` - Please use `getQueues()` instead.
  - `showVisitorCodeViewController()` - Please use `showVisitorCode()` instead.

### 3.0.0

Glia Widgets Ionic SDK introduced.

#### Added
- Entry Widget
- Secure Conversations v2


## Documentation

For detailed documentation and API reference, please visit [Glia Knowledge Base](https://docs.glia.com/glia-mobile).

## Support

For technical support and questions, please contact [Glia Service Desk](https://glia.atlassian.net/servicedesk/customer/portal/1).
