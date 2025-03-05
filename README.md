# glia-widgets-ionic

GliaWidgets SDK is a simple and customisable framework built on top of GliaSDK. It provides all the necessary UI components to quickly integrate GliaSDK into your project.

## Installation

To install version 3.0.0 of this package use:

```text
npm install github:salemove/widgets_sdk_ionic
```

# How to use GliaSDK in Ionic environment

```js
// Import `glia-widgets-ionic` plugin
import { GliaSdk } from 'glia-widgets-ionic';

// Configure SDK
GliaSdk.configure({
  siteId: 'site-id',
  apiKey: { id: 'api-key-id', secret: 'api-key-secret' },
  region: 'us',
  companyName: 'Ionic Company',
});

// Start engagement
GliaSdk.startAudio();
```

## API

<docgen-index>

* [`configure(...)`](#configure)
* [`presentEntryWidget()`](#presententrywidget)
* [`startChat()`](#startchat)
* [`startAudio()`](#startaudio)
* [`startVideo()`](#startvideo)
* [`startSecureConversation()`](#startsecureconversation)
* [`clearVisitorSession()`](#clearvisitorsession)
* [`listQueues()`](#listqueues)
* [`showVisitorCodeViewController()`](#showvisitorcodeviewcontroller)
* [`authenticate(...)`](#authenticate)
* [`deauthenticate()`](#deauthenticate)
* [`isAuthenticated()`](#isauthenticated)
* [`refreshAuthentication(...)`](#refreshauthentication)
* [`pauseLiveObservation()`](#pauseliveobservation)
* [`resumeLiveObservation()`](#resumeliveobservation)
* [Interfaces](#interfaces)
* [Type Aliases](#type-aliases)

</docgen-index>

<docgen-api>
<!--Update the source file JSDoc comments and rerun docgen to update the docs below-->

### configure(...)

```typescript
configure(options: { siteId: string; queueIds?: string[]; apiKey: ApiKey; region: Region; companyName: string; overrideLocale?: string; }) => Promise<void>
```

configures GliaWidgets SDK with credentials.

NB! To make plugin work properly, use `create-visitor` credentials for Site APIKey only.

| Param         | Type                                                                                                                                                                            |
| ------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| **`options`** | <code>{ siteId: string; queueIds?: string[]; apiKey: <a href="#apikey">ApiKey</a>; region: <a href="#region">Region</a>; companyName: string; overrideLocale?: string; }</code> |

--------------------


### presentEntryWidget()

```typescript
presentEntryWidget() => Promise<void>
```

Presents Entry Widget.

--------------------


### startChat()

```typescript
startChat() => Promise<void>
```

Starts a new chat/text engagement with queue identifiers. If `queueIds` is null or empty, creates engagement for default queue.

--------------------


### startAudio()

```typescript
startAudio() => Promise<void>
```

Starts a new audio engagement with queue identifiers. If `queueIds` is null or empty, creates engagement for default queue.

--------------------


### startVideo()

```typescript
startVideo() => Promise<void>
```

Starts a new video engagement for queue identifiers. If `queueIds` is null or empty, creates engagement for default queue.

--------------------


### startSecureConversation()

```typescript
startSecureConversation() => Promise<void>
```

Starts Secure Conversation flow with passed `start screen`.
Secure Conversation requires authentication/IdToken.

--------------------


### clearVisitorSession()

```typescript
clearVisitorSession() => Promise<void>
```

Recreates currently used visitor in SDK.

--------------------


### listQueues()

```typescript
listQueues() => Promise<any>
```

Fetches all queues with its info for current site.

**Returns:** <code>Promise&lt;any&gt;</code>

--------------------


### showVisitorCodeViewController()

```typescript
showVisitorCodeViewController() => Promise<void>
```

Presents GliaWidgets UI with visitor code for sharing with operator to start an engagement.

--------------------


### authenticate(...)

```typescript
authenticate(options: { behavior: AuthenticationBehavior; idToken: string; accessToken?: string; }) => Promise<void>
```

Authenticates visitor.

| Param         | Type                                                                                                                            | Description                                                                       |
| ------------- | ------------------------------------------------------------------------------------------------------------------------------- | --------------------------------------------------------------------------------- |
| **`options`** | <code>{ behavior: <a href="#authenticationbehavior">AuthenticationBehavior</a>; idToken: string; accessToken?: string; }</code> | - Provides options for authentication such as behavior, idToken, and accessToken. |

--------------------


### deauthenticate()

```typescript
deauthenticate() => Promise<void>
```

Deauthenticates visitor. Be aware that deauthentication process relies on <a href="#authenticationbehavior">`AuthenticationBehavior`</a>

--------------------


### isAuthenticated()

```typescript
isAuthenticated() => Promise<void>
```

Provides current authentication state

--------------------


### refreshAuthentication(...)

```typescript
refreshAuthentication(options: { idToken: string; accessToken?: string; }) => Promise<void>
```

Refreshes authentication access properties.

| Param         | Type                                                    |
| ------------- | ------------------------------------------------------- |
| **`options`** | <code>{ idToken: string; accessToken?: string; }</code> |

--------------------


### pauseLiveObservation()

```typescript
pauseLiveObservation() => Promise<void>
```

Makes a pause for ongoing LiveObservation session.

--------------------


### resumeLiveObservation()

```typescript
resumeLiveObservation() => Promise<void>
```

Resumes ongoing LiveObservation session.

--------------------


### Interfaces


#### ApiKey

| Prop         | Type                |
| ------------ | ------------------- |
| **`id`**     | <code>string</code> |
| **`secret`** | <code>string</code> |


### Type Aliases


#### Region

Site's region.

<code>'us' | 'eu' | 'beta'</code>


#### AuthenticationBehavior

Authentication (IdToken) behavior.
forbiddenDuringEngagement - Prevent creation a new engagement if ongoing engagement exists. Default behavior.
allowedDuringEngagement - Allows creation a new engagement if ongoing engagement exists. During this behavior original engagement will be ended and a new engagement engagement will be restarted with the same operator after authentication is succeded.

<code>'forbiddenDuringEngagement' | 'allowedDuringEngagement'</code>

</docgen-api>
