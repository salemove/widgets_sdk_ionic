/**
 * @fileoverview GliaWidgets SDK definitions.
 * This file contains TypeScript interfaces and types used in the Glia Ionic SDK.
 */
/**
 * GliaWidgets SDK configuration.
 */
export interface Configuration {
    /**
     * The Glia site ID.
     */
    siteId: string;
    /**
     * @deprecated Use `queueIds` during startChat, startAudio, or startVideo instead.
     * List of queue IDs to be used when requesting an engagement.
     * If `queueIds` is undefined or empty, the visitor is enqueued in the default queue(s).
     */
    queueIds?: string[];
    /**
     * The API key for the Glia site.
     *
     * @see {@link ApiKey} for more details.
     */
    apiKey: ApiKey;
    /**
     * The region of the site.
     * Possible values are defined in the {@link Region}.
     */
    region: Region;
    /**
     * The name of the company.
     * This is used as the company name shown in the UI while establishing a connection with an operator.
     */
    companyName: string;
    /**
     * The name of the locale to be used instead of the default locale of the site.
     * If not provided, the default locale will be used.
     * The default value is `undefined`.
     */
    overrideLocale?: string;
    /**
     * UI customization settings in a cross-platform format.
     * This can be a JSON object or a JSON string.
     * The default value is `undefined`.
     */
    uiUnifiedConfig?: object | string;
    /**
     * ID of the PDF asset containing additional visitor context for an operator.
     * The default value is `undefined`.
     */
    visitorContextAssetId?: string;
    /**
     * A bubble shown outside the app during an engagement when the app is not in the foreground.
     * Available only on Android when a visitor grants Screen Overlay permission.
     * The default value is `true`.
     */
    enableBubbleOutsideApp?: boolean;
    /**
     * A bubble shown within the app but outside the engagement view during an engagement.
     * The default value is `true`.
     */
    enableBubbleInsideApp?: boolean;
    /**
     * Whether to suppress push notification permission request during authentication.
     */
    suppressPushNotificationsPermissionRequestDuringAuthentication?: boolean;
}
/**
 * Used for configuring the Glia SDK with site API key ID and secret.
 *
 * Note that for the SDK to work properly, the site API key needs to have the 'Create Visitor' permission only.
 */
export interface ApiKey {
    /**
     * The ID of the site API key.
     */
    id: string;
    /**
     * The site API key secret.
     */
    secret: string;
}
/**
 * Site's region. Use `us` for US and other regions except Europe, use `eu` for Europe.
 */
export declare const Region: Readonly<{
    US: string;
    EU: string;
}>;
export declare type Region = (typeof Region)[keyof typeof Region];
/**
 * Behavior for authentication and deauthentication.
 * FORBIDDEN_DURING_ENGAGEMENT - Do not allow authentication and deauthentication during an ongoing engagement. Default behavior.
 * ALLOWED_DURING_ENGAGEMENT - Allow authentication and deauthentication during an ongoing engagement.
 */
export declare const AuthenticationBehavior: Readonly<{
    FORBIDDEN_DURING_ENGAGEMENT: string;
    ALLOWED_DURING_ENGAGEMENT: string;
}>;
export declare type AuthenticationBehavior = (typeof AuthenticationBehavior)[keyof typeof AuthenticationBehavior];
/**
 * Queue information.
 */
export interface Queue {
    /**
     * Indicates if queue is default.
     */
    is_default: boolean;
    /**
     * Queue media types.
     */
    media: MediaType[];
    /**
     * Queue name.
     */
    name: string;
    status: Queue.Status;
}
export declare namespace Queue {
    /**
     * Queue status.
     */
    const Status: Readonly<{
        OPENED: string;
        CLOSED: string;
        FULL: string;
        UNSTAFFED: string;
    }>;
    type Status = (typeof Status)[keyof typeof Status];
}
/**
 * Queue media types.
 */
export declare const MediaType: Readonly<{
    TEXT: string;
    PHONE: string;
    AUDIO: string;
    VIDEO: string;
    MESSAGING: string;
}>;
export declare type MediaType = (typeof MediaType)[keyof typeof MediaType];
/**
 * A collection of queues where:
 * - The key is the queue ID.
 * - The value is a `Queue` object that describes the queue's details.
 */
export declare type Queues = Record<string, Queue>;
/**
 * The information about a visitor.
 * This information is visible to operators and can be updated by the SDK or operators.
 */
export interface VisitorInfo {
    /**
     * Visitor's name.
     */
    name?: string;
    /**
     * Visitor's email address.
     */
    email?: string;
    /**
     * Visitor's phone number.
     */
    phone?: string;
    /**
     * Additional notes about the visitor.
     */
    note?: string;
    /**
     * External ID to be used in third-party integrations.
     */
    externalId?: string;
    /**
     * A dictionary with custom attributes.
     */
    customAttributes: Record<string, string>;
    /**
     * Indicates whether the visitor is blocked.
     */
    banned: boolean;
}
/**
 * Used to update visitor information.
 * If some fields of visitor information are not set, they will not be updated on the server.
 */
export interface VisitorInfoUpdate {
    /**
     * Visitor's name.
     * The default value is `undefined`.
     */
    name?: string;
    /**
     * Visitor's email address.
     * The default value is `undefined`.
     */
    email?: string;
    /**
     * Visitor's phone number.
     * The default value is `undefined`.
     */
    phone?: string;
    /**
     * Additional notes about the visitor.
     * The default value is `undefined`.
     */
    note?: string;
    /**
     * The method for updating the notes about the visitor.
     * The default value is `undefined`.
     *
     * @see {@link VisitorInfoUpdate.NoteUpdateMethod} for more details.
     */
    noteUpdateMethod?: VisitorInfoUpdate.NoteUpdateMethod;
    /**
     * External ID to be used in third-party integrations.
     * The default value is `undefined`.
     */
    externalId?: string;
    /**
     * A dictionary with custom attributes.
     * The default value is `undefined`.
     */
    customAttributes?: Record<string, string>;
    /**
     * The method for updating custom attributes.
     * The default value is `undefined`.
     *
     * @see {@link VisitorInfoUpdate.CustomAttributesUpdateMethod} for more details.
     */
    customAttributesUpdateMethod?: VisitorInfoUpdate.CustomAttributesUpdateMethod;
}
export declare namespace VisitorInfoUpdate {
    /**
     * Specifies a method for updating the visitor's notes.
     * replace - The visitor's notes will be overwritten with the notes specified in the request.
     * append - A line break (\n) will be added, and the specified notes will be appended to the existing visitor’s notes.
     */
    const NoteUpdateMethod: Readonly<{
        REPLACE: string;
        APPEND: string;
    }>;
    type NoteUpdateMethod = (typeof NoteUpdateMethod)[keyof typeof NoteUpdateMethod];
    /**
     * Specifies a method for updating the visitor's custom attributes.
     * replace - All custom attributes for the visitor will be overwritten with the attributes specified in the request.
     * merge - Only custom attributes present in the request will be added or updated. Custom attributes can be removed by setting their values to `null`.
     */
    const CustomAttributesUpdateMethod: Readonly<{
        REPLACE: string;
        MERGE: string;
    }>;
    type CustomAttributesUpdateMethod = (typeof CustomAttributesUpdateMethod)[keyof typeof CustomAttributesUpdateMethod];
}
export interface GliaSdkPlugin {
    /**
     * Configures GliaWidgets SDK.
     *
     * Note that for the SDK to work properly, the site API key needs to have the 'Create Visitor' permission only.
     *
     * @param configuration - {@link Configuration} options for the GliaWidgets SDK.
     */
    configure(configuration: Configuration): Promise<void>;
    /**
     * @deprecated Use showEntryWidget() instead.
     * Shows Entry Widget.
     */
    presentEntryWidget(): Promise<void>;
    /**
     * Shows Entry Widget.
     */
    showEntryWidget(options: {
        /**
         * List of queue IDs to be used when requesting an engagement. If `queueIds` is undefined or empty, the visitor is enqueued in the default queue(s).
         */
        queueIds?: string[];
    }): Promise<void>;
    /**
     * Hides Entry Widget.
     */
    hideEntryWidget(): Promise<void>;
    /**
     * Starts a new chat engagement.
     */
    startChat(options?: {
        /**
         * List of queue IDs to be used when requesting an engagement. If `queueIds` is undefined or empty, the visitor is enqueued in the default queue(s).
         * Pay attention: `queueIds` could have been set using the deprecated `configure` parameter.
         */
        queueIds?: string[];
    }): Promise<void>;
    /**
     * Starts a new audio engagement.
     */
    startAudio(options?: {
        /**
         * List of queue IDs to be used when requesting an engagement. If `queueIds` is undefined or empty, the visitor is enqueued in the default queue(s).
         * Pay attention: `queueIds` could have been set using the deprecated `configure` parameter.
         */
        queueIds?: string[];
    }): Promise<void>;
    /**
     * Starts a new video engagement.
     */
    startVideo(options?: {
        /**
         * List of queue IDs to be used when requesting an engagement. If `queueIds` is undefined or empty, the visitor is enqueued in the default queue(s).
         * Pay attention: `queueIds` could have been set using the deprecated `configure` parameter.
         */
        queueIds?: string[];
    }): Promise<void>;
    /**
     * @deprecated Use startSecureMessaging() instead.
     * Starts a Secure Conversation flow.
     * Note that Secure Conversation requires visitor authentication.
     */
    startSecureConversation(): Promise<void>;
    /**
     * Starts a Secure Conversation flow.
     * Note that Secure Conversation requires visitor authentication.
     */
    startSecureMessaging(options: {
        /**
         * List of queue IDs to be used when requesting an engagement. If `queueIds` is undefined or empty, the visitor is enqueued in the default queue(s).
         */
        queueIds?: string[];
    }): Promise<void>;
    /**
     * Clears current Glia SDK session, and also resets the visitor ID and their local data.
     * Ends ongoing engagement (if any).
     */
    clearVisitorSession(): Promise<void>;
    /**
     * @deprecated Use getQueues() instead.
     * Fetches all queues with its info for current site.
     */
    listQueues(): Promise<any>;
    /**
     * Fetches all queues and their information for the current site.
     * @returns {Promise<Queues>} - A collection of queues where the key is the queue ID and the value is a `Queue` object that describes the queue's details.
     */
    getQueues(): Promise<Queues>;
    /**
     * @deprecated Use showVisitorCode() instead.
     * Presents GliaWidgets UI with a visitor code for sharing with operator to start an engagement.
     */
    showVisitorCodeViewController(): Promise<void>;
    /**
     * Presents GliaWidgets UI with a visitor code for sharing with operator to start an engagement.
     */
    showVisitorCode(): Promise<void>;
    /**
     * Authenticates the visitor.
     * @param options - Provides options for authentication such as behavior, idToken, and accessToken.
     */
    authenticate(options: {
        /**
         * Controls authentication during an engagement.
         * @see {@link AuthenticationBehavior} for more details.
         */
        behavior: AuthenticationBehavior;
        /**
         * JWT token (Direct ID token) for visitor authentication.
         */
        idToken: string;
        /**
         * An access token that can be used to make authenticated requests to other systems on behalf of the authenticated visitor.
         * The default value is `undefined`.
         */
        accessToken?: string;
    }): Promise<void>;
    /**
     * Deauthenticates the visitor. Be aware that deauthentication process relies on `AuthenticationBehavior`.
     */
    deauthenticate(options?: {
        /**
         * Whether to unsubscribe the visitor from receiving push notifications on deauthentication.
         */
        stopPushNotifications?: boolean;
    }): Promise<void>;
    /**
     * Provides the current authentication state.
     */
    isAuthenticated(): Promise<boolean>;
    /**
     * Renews visitor authentication.
     */
    refreshAuthentication(options: {
        /**
         * JWT token (Direct ID token) for visitor authentication.
         */
        idToken: string;
        /**
         * An access token that can be used to make authenticated requests to other systems on behalf of the authenticated visitor.
         * The default value is `undefined`.
         */
        accessToken?: string;
    }): Promise<void>;
    /**
     * Pauses the ongoing LiveObservation session.
     */
    pauseLiveObservation(): Promise<void>;
    /**
     * Resumes the paused LiveObservation session.
     */
    resumeLiveObservation(): Promise<void>;
    /**
     * Fetches the visitor information.
     * @returns VisitorInfo - The information about a visitor.
     */
    getVisitorInfo(): Promise<VisitorInfo>;
    /**
     * Updates the visitor information.
     */
    updateVisitorInfo(visitorInfo: VisitorInfoUpdate): Promise<void>;
    /**
     * Ends the current engagement.
     */
    endEngagement(): Promise<void>;
}
