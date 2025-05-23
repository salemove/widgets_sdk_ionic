# glia-widgets-ionic

GliaWidgets SDK is a simple and customisable framework built on top of GliaSDK. It provides all the necessary UI components to quickly integrate GliaSDK into your project.

## Installation

To install the @salemove/widgets_sdk_ionic package use:

```text
npm install @salemove/widgets_sdk_ionic --legacy-peer-deps
```

# How to use GliaSDK in Ionic environment

```js
// Import `glia-widgets-ionic` SDK
import { GliaSdk } from '@salemove/widgets_sdk_ionic';

// Configure SDK
GliaSdk.configure({
  siteId: 'site-id',
  apiKey: { id: 'api-key-id', secret: 'api-key-secret' },
  region: 'us',
  companyName: 'Ionic Company',
});

// Show Entry Widget
GliaSdk.presentEntryWidget();
```

## API

<docgen-index>

* [`configure(...)`](#configure)
* [`presentEntryWidget()`](#presententrywidget)
* [`showEntryWidget(...)`](#showentrywidget)
* [`hideEntryWidget()`](#hideentrywidget)
* [`startChat(...)`](#startchat)
* [`startAudio(...)`](#startaudio)
* [`startVideo(...)`](#startvideo)
* [`startSecureConversation()`](#startsecureconversation)
* [`startSecureMessaging(...)`](#startsecuremessaging)
* [`clearVisitorSession()`](#clearvisitorsession)
* [`listQueues()`](#listqueues)
* [`getQueues()`](#getqueues)
* [`showVisitorCodeViewController()`](#showvisitorcodeviewcontroller)
* [`showVisitorCode()`](#showvisitorcode)
* [`authenticate(...)`](#authenticate)
* [`deauthenticate()`](#deauthenticate)
* [`isAuthenticated()`](#isauthenticated)
* [`refreshAuthentication(...)`](#refreshauthentication)
* [`pauseLiveObservation()`](#pauseliveobservation)
* [`resumeLiveObservation()`](#resumeliveobservation)
* [`getVisitorInfo()`](#getvisitorinfo)
* [`updateVisitorInfo(...)`](#updatevisitorinfo)
* [`endEngagement()`](#endengagement)
* [Interfaces](#interfaces)
* [Type Aliases](#type-aliases)

</docgen-index>

<docgen-api>
<!--Update the source file JSDoc comments and rerun docgen to update the docs below-->

### configure(...)

```typescript
configure(configuration: Configuration) => Promise<void>
```

Configures GliaWidgets SDK.

Note that for the SDK to work properly, the site API key needs to have the 'Create Visitor' permission only.

| Param               | Type                                                    | Description                                                                           |
| ------------------- | ------------------------------------------------------- | ------------------------------------------------------------------------------------- |
| **`configuration`** | <code><a href="#configuration">Configuration</a></code> | - {@link <a href="#configuration">Configuration</a>} options for the GliaWidgets SDK. |

--------------------


### presentEntryWidget()

```typescript
presentEntryWidget() => Promise<void>
```

--------------------


### showEntryWidget(...)

```typescript
showEntryWidget(options: { queueIds?: string[]; }) => Promise<void>
```

Shows Entry Widget.

| Param         | Type                                  |
| ------------- | ------------------------------------- |
| **`options`** | <code>{ queueIds?: string[]; }</code> |

--------------------


### hideEntryWidget()

```typescript
hideEntryWidget() => Promise<void>
```

Hides Entry Widget.

--------------------


### startChat(...)

```typescript
startChat(options?: { queueIds?: string[] | undefined; } | undefined) => Promise<void>
```

Starts a new chat engagement.

| Param         | Type                                  |
| ------------- | ------------------------------------- |
| **`options`** | <code>{ queueIds?: string[]; }</code> |

--------------------


### startAudio(...)

```typescript
startAudio(options?: { queueIds?: string[] | undefined; } | undefined) => Promise<void>
```

Starts a new audio engagement.

| Param         | Type                                  |
| ------------- | ------------------------------------- |
| **`options`** | <code>{ queueIds?: string[]; }</code> |

--------------------


### startVideo(...)

```typescript
startVideo(options?: { queueIds?: string[] | undefined; } | undefined) => Promise<void>
```

Starts a new video engagement.

| Param         | Type                                  |
| ------------- | ------------------------------------- |
| **`options`** | <code>{ queueIds?: string[]; }</code> |

--------------------


### startSecureConversation()

```typescript
startSecureConversation() => Promise<void>
```

--------------------


### startSecureMessaging(...)

```typescript
startSecureMessaging(options: { queueIds?: string[]; }) => Promise<void>
```

Starts a Secure Conversation flow.
Note that Secure Conversation requires visitor authentication.

| Param         | Type                                  |
| ------------- | ------------------------------------- |
| **`options`** | <code>{ queueIds?: string[]; }</code> |

--------------------


### clearVisitorSession()

```typescript
clearVisitorSession() => Promise<void>
```

Clears current Glia SDK session, and also resets the visitor ID and their local data.
Ends ongoing engagement (if any).

--------------------


### listQueues()

```typescript
listQueues() => Promise<any>
```

**Returns:** <code>Promise&lt;any&gt;</code>

--------------------


### getQueues()

```typescript
getQueues() => Promise<Queues>
```

Fetches all queues and their information for the current site.

**Returns:** <code>Promise&lt;<a href="#queues">Queues</a>&gt;</code>

--------------------


### showVisitorCodeViewController()

```typescript
showVisitorCodeViewController() => Promise<void>
```

--------------------


### showVisitorCode()

```typescript
showVisitorCode() => Promise<void>
```

Presents GliaWidgets UI with a visitor code for sharing with operator to start an engagement.

--------------------


### authenticate(...)

```typescript
authenticate(options: { behavior: AuthenticationBehavior; idToken: string; accessToken?: string; }) => Promise<void>
```

Authenticates the visitor.

| Param         | Type                                                                      | Description                                                                       |
| ------------- | ------------------------------------------------------------------------- | --------------------------------------------------------------------------------- |
| **`options`** | <code>{ behavior: string; idToken: string; accessToken?: string; }</code> | - Provides options for authentication such as behavior, idToken, and accessToken. |

--------------------


### deauthenticate()

```typescript
deauthenticate() => Promise<void>
```

Deauthenticates the visitor. Be aware that deauthentication process relies on <a href="#authenticationbehavior">`AuthenticationBehavior`</a>.

--------------------


### isAuthenticated()

```typescript
isAuthenticated() => Promise<boolean>
```

Provides the current authentication state.

**Returns:** <code>Promise&lt;boolean&gt;</code>

--------------------


### refreshAuthentication(...)

```typescript
refreshAuthentication(options: { idToken: string; accessToken?: string; }) => Promise<void>
```

Renews visitor authentication.

| Param         | Type                                                    |
| ------------- | ------------------------------------------------------- |
| **`options`** | <code>{ idToken: string; accessToken?: string; }</code> |

--------------------


### pauseLiveObservation()

```typescript
pauseLiveObservation() => Promise<void>
```

Pauses the ongoing LiveObservation session.

--------------------


### resumeLiveObservation()

```typescript
resumeLiveObservation() => Promise<void>
```

Resumes the paused LiveObservation session.

--------------------


### getVisitorInfo()

```typescript
getVisitorInfo() => Promise<VisitorInfo>
```

Fetches the visitor information.

**Returns:** <code>Promise&lt;<a href="#visitorinfo">VisitorInfo</a>&gt;</code>

--------------------


### updateVisitorInfo(...)

```typescript
updateVisitorInfo(visitorInfo: VisitorInfoUpdate) => Promise<void>
```

Updates the visitor information.

| Param             | Type                                                            |
| ----------------- | --------------------------------------------------------------- |
| **`visitorInfo`** | <code><a href="#visitorinfoupdate">VisitorInfoUpdate</a></code> |

--------------------


### endEngagement()

```typescript
endEngagement() => Promise<void>
```

Ends the current engagement.

--------------------


### Interfaces


#### Configuration

GliaWidgets SDK configuration.

| Prop                         | Type                                      | Description                                                                                                                                                                                        |
| ---------------------------- | ----------------------------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| **`siteId`**                 | <code>string</code>                       | The Glia site ID.                                                                                                                                                                                  |
| **`queueIds`**               | <code>string[]</code>                     |                                                                                                                                                                                                    |
| **`apiKey`**                 | <code><a href="#apikey">ApiKey</a></code> | The API key for the Glia site.                                                                                                                                                                     |
| **`region`**                 | <code><a href="#region">Region</a></code> | The region of the site. Possible values are defined in the {@link <a href="#region">Region</a>}.                                                                                                   |
| **`companyName`**            | <code>string</code>                       | The name of the company. This is used as the company name shown in the UI while establishing a connection with an operator.                                                                        |
| **`overrideLocale`**         | <code>string</code>                       | The name of the locale to be used instead of the default locale of the site. If not provided, the default locale will be used. The default value is `undefined`.                                   |
| **`uiUnifiedConfig`**        | <code>string \| object</code>             | UI customization settings in a cross-platform format. This can be a JSON object or a JSON string. The default value is `undefined`.                                                                |
| **`visitorContextAssetId`**  | <code>string</code>                       | ID of the PDF asset containing additional visitor context for an operator. The default value is `undefined`.                                                                                       |
| **`enableBubbleOutsideApp`** | <code>boolean</code>                      | A bubble shown outside the app during an engagement when the app is not in the foreground. Available only on Android when a visitor grants Screen Overlay permission. The default value is `true`. |
| **`enableBubbleInsideApp`**  | <code>boolean</code>                      | A bubble shown within the app but outside the engagement view during an engagement. The default value is `true`.                                                                                   |


#### ApiKey

Used for configuring the Glia SDK with site API key ID and secret.

Note that for the SDK to work properly, the site API key needs to have the 'Create Visitor' permission only.

| Prop         | Type                | Description                 |
| ------------ | ------------------- | --------------------------- |
| **`id`**     | <code>string</code> | The ID of the site API key. |
| **`secret`** | <code>string</code> | The site API key secret.    |


#### Queue

<a href="#queue">Queue</a> information.

| Prop             | Type                                           | Description                             |
| ---------------- | ---------------------------------------------- | --------------------------------------- |
| **`is_default`** | <code>boolean</code>                           | Indicates if queue is default.          |
| **`media`**      | <code>string[]</code>                          | <a href="#queue">Queue</a> media types. |
| **`name`**       | <code>string</code>                            | <a href="#queue">Queue</a> name.        |
| **`status`**     | <code><a href="#queue">Queue</a>.Status</code> |                                         |


#### VisitorInfo

The information about a visitor.
This information is visible to operators and can be updated by the SDK or operators.

| Prop                   | Type                                                            | Description                                         |
| ---------------------- | --------------------------------------------------------------- | --------------------------------------------------- |
| **`name`**             | <code>string</code>                                             | Visitor's name.                                     |
| **`email`**            | <code>string</code>                                             | Visitor's email address.                            |
| **`phone`**            | <code>string</code>                                             | Visitor's phone number.                             |
| **`note`**             | <code>string</code>                                             | Additional notes about the visitor.                 |
| **`externalId`**       | <code>string</code>                                             | External ID to be used in third-party integrations. |
| **`customAttributes`** | <code><a href="#record">Record</a>&lt;string, string&gt;</code> | A dictionary with custom attributes.                |
| **`banned`**           | <code>boolean</code>                                            | Indicates whether the visitor is blocked.           |


#### VisitorInfoUpdate

Used to update visitor information.
If some fields of visitor information are not set, they will not be updated on the server.

| Prop                               | Type                                                                                         | Description                                                                            |
| ---------------------------------- | -------------------------------------------------------------------------------------------- | -------------------------------------------------------------------------------------- |
| **`name`**                         | <code>string</code>                                                                          | Visitor's name. The default value is `undefined`.                                      |
| **`email`**                        | <code>string</code>                                                                          | Visitor's email address. The default value is `undefined`.                             |
| **`phone`**                        | <code>string</code>                                                                          | Visitor's phone number. The default value is `undefined`.                              |
| **`note`**                         | <code>string</code>                                                                          | Additional notes about the visitor. The default value is `undefined`.                  |
| **`noteUpdateMethod`**             | <code><a href="#visitorinfoupdate">VisitorInfoUpdate</a>.NoteUpdateMethod</code>             | The method for updating the notes about the visitor. The default value is `undefined`. |
| **`externalId`**                   | <code>string</code>                                                                          | External ID to be used in third-party integrations. The default value is `undefined`.  |
| **`customAttributes`**             | <code><a href="#record">Record</a>&lt;string, string&gt;</code>                              | A dictionary with custom attributes. The default value is `undefined`.                 |
| **`customAttributesUpdateMethod`** | <code><a href="#visitorinfoupdate">VisitorInfoUpdate</a>.CustomAttributesUpdateMethod</code> | The method for updating custom attributes. The default value is `undefined`.           |


### Type Aliases


#### Region

Site's region. Use `us` for US and other regions except Europe, use `eu` for Europe.

<code>(typeof <a href="#region">Region</a>)[keyof typeof Region]</code>


#### Queues

A collection of queues where:
- The key is the queue ID.
- The value is a <a href="#queue">`Queue`</a> object that describes the queue's details.

<code><a href="#record">Record</a>&lt;string, <a href="#queue">Queue</a>&gt;</code>


#### Record

Construct a type with a set of properties K of type T

<code>{ [P in K]: T; }</code>


#### MediaType

<a href="#queue">Queue</a> media types.

<code>(typeof <a href="#mediatype">MediaType</a>)[keyof typeof MediaType]</code>


#### AuthenticationBehavior

Behavior for authentication and deauthentication.
FORBIDDEN_DURING_ENGAGEMENT - Do not allow authentication and deauthentication during an ongoing engagement. Default behavior.
ALLOWED_DURING_ENGAGEMENT - Allow authentication and deauthentication during an ongoing engagement.

<code>(typeof <a href="#authenticationbehavior">AuthenticationBehavior</a>)[keyof typeof AuthenticationBehavior]</code>

</docgen-api>
