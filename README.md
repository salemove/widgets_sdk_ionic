# Glia Widgets Ionic

GliaWidgets SDK is a simple and customisable framework built on top of GliaSDK. It provides all the necessary UI components to quickly integrate GliaSDK into your project.

## Changelog

### 3.2.0

Updated underlying SDKs:
- Android Widgets SDK v3.2.0
- iOS Widgets SDK v3.2.0

#### Android Widgets SDK
##### Changed
- The Add Attachment and Send Message buttons are now enabled and disabled instead of appearing or disappearing.
- All screen sharing functionality has been completely removed from both the Widget SDK and Core SDK.

##### Fixed
- Unified several design differences between iOS and Android, including dialog element sizing, confirmation dialog padding, avatar size and placeholder padding, and various survey elements.
- Fixed an issue with visitor deauthentication where the engagement would end when the authentication behavior was configured as `FORBIDDEN_DURING_ENGAGEMENT`.

#### iOS Widgets SDK
##### Changed
- All screen sharing functionality has been completely removed from both the Widget SDK and Core SDK.

##### Fixed
- Unified several design differences between iOS and Android, including snackbar background color on Chat and Call screens, avatar size and placeholder padding, and various survey elements.
- Fixed freezing during push notification setup when an APNs token was not passed to the SDK.
- The visitor survey now opens correctly after ending a chat.
- The default selected option can now be deselected for single-choice questions in surveys.
- Fixed an issue where the End button briefly appeared when the visitor closed Chat screen while being enqueued.
- The unread messages bubble now correctly disappears from the Chat screen after messages are read.
- Fixed a bug in SDK versions 3.1.0 and 3.1.1 where the bubble did not appear after visitor authentication during an ongoing engagement.

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
