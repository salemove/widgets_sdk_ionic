# Glia Widgets Ionic

GliaWidgets SDK is a simple and customisable framework built on top of GliaSDK. It provides all the necessary UI components to quickly integrate GliaSDK into your project.

## Changelog

### 3.2.2

Updated underlying SDKs:
- [Android Widgets SDK v3.2.2](#android-widgets-sdk-v322)
- [iOS Widgets SDK v3.2.2](#ios-widgets-sdk-v322)

### Android Widgets SDK v3.2.2
#### Added
- Implemented site info caching for 10 seconds to reduce frequent API calls.

#### Changed
- Integrators can now extend the Glia SDK's built-in `GliaFcmService`.
- Improved `GliaWidgets.init()` exception causes, providing more informative messages for `com.glia.widgets.GliaWidgetsException` when the SDK fails to initialize due to credential issues.
- Updated Unified Customization for survey screen and added some configuration options.
- Replaced the custom survey view with a bottom sheet design to improve display behavior, addressing issues like full-screen expansion and background transparency.

#### Fixed
- Unified a design difference between iOS and Android related to applying styles to survey input fields.
- Corrected an error where cached locale strings failed to receive updates depending on the device's time zone relative to UTC. Locale strings now update immediately on device restart.
- Fixed an issue that caused a crash when establishing media streams.
- Addressed memory leak issues, improving overall performance and stability.
- Aligned operator name display across Widgets screens to consistently show only the first name.

### iOS Widgets SDK v3.2.2
#### Changed
- The header of the Chat screen now has a shadow.
- Updated Unified Customization for survey screen and added some configuration options.

#### Fixed
- Fixed an issue that the visitor survey was not opening after ending the chat.
- Fixed a bug where a failed engagement could not be closed.
- Fixed an issue of app crashing when uploading attachments to the chat during a Live Observation.
- Unified a design difference between iOS and Android related to applying styles to survey input fields.

### 3.2.1

Updated underlying SDKs:
- [iOS Widgets SDK v3.2.1](#ios-widgets-sdk-v321)

#### Added
- Added support for subscribing to the count of the unread secure messages.

#### iOS Widgets SDK v3.2.1
##### Changed
- Phoenix Client iOS dependency has been updated to version 5.3.5.

##### Fixed
- For authenticated visitors, the Chat screen on iOS now does not show a separate close button, only the left arrow, matching the Android UI. 
- When a visitor requests a live chat after leaving Secure Messaging, they are now automatically enqueued.
- The "Leave Current Conversation" dialog is now correctly shown when an ongoing transferred Secure Messaging engagement exists and the visitor decides to start a new engagement.

### 3.2.0

Updated underlying SDKs:
- [Android Widgets SDK v3.2.0](#android-widgets-sdk-v320)
- [iOS Widgets SDK v3.2.0](#ios-widgets-sdk-v320)

#### Android Widgets SDK v3.2.0
##### Changed
- The Add Attachment and Send Message buttons are now enabled and disabled instead of appearing or disappearing.
- All screen sharing functionality has been completely removed from both the Widget SDK and Core SDK.

##### Fixed
- Unified several design differences between iOS and Android, including dialog element sizing, confirmation dialog padding, avatar size and placeholder padding, and various survey elements.
- Fixed an issue with visitor deauthentication where the engagement would end when the authentication behavior was configured as `FORBIDDEN_DURING_ENGAGEMENT`.

#### iOS Widgets SDK v3.2.0
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
