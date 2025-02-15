export interface ApiKey {
    id: string;
    secret: string;
}
/**
 * Site's region.
 */
export declare type Region = 'us' | 'eu' | 'beta';
/**
 * Authentication (IdToken) behavior.
 * forbiddenDuringEngagement - Prevent creation a new engagement if ongoing engagement exists. Default behavior.
 * allowedDuringEngagement - Allows creation a new engagement if ongoing engagement exists. During this behavior original engagement will be ended and a new engagement engagement will be restarted with the same operator after authentication is succeded.
 */
export declare type AuthenticationBehavior = 'forbiddenDuringEngagement' | 'allowedDuringEngagement';
export interface GliaSdkPlugin {
    /**
     * configures GliaWidgets SDK with credentials.
     *
     * NB! To make plugin work properly, use `create-visitor` credentials for Site APIKey only.
     */
    configure(options: {
        siteId: string;
        queueIds?: string[];
        apiKey: ApiKey;
        region: Region;
        companyName: string;
        overrideLocale?: string;
    }): Promise<void>;
    /**
     * Presents Entry Widget.
     */
    presentEntryWidget(): Promise<void>;
    /**
     * Starts a new chat/text engagement with queue identifiers. If `queueIds` is null or empty, creates engagement for default queue.
     */
    startChat(): Promise<void>;
    /**
     * Starts a new audio engagement with queue identifiers. If `queueIds` is null or empty, creates engagement for default queue.
     */
    startAudio(): Promise<void>;
    /**
     * Starts a new video engagement for queue identifiers. If `queueIds` is null or empty, creates engagement for default queue.
     */
    startVideo(): Promise<void>;
    /**
     * Starts Secure Conversation flow with passed `start screen`.
     * Secure Conversation requires authentication/IdToken.
     */
    startSecureConversation(): Promise<void>;
    /**
     * Recreates currently used visitor in SDK.
     */
    clearVisitorSession(): Promise<void>;
    /**
     * Fetches all queues with its info for current site.
     */
    listQueues(): Promise<any>;
    /**
     * Presents GliaWidgets UI with visitor code for sharing with operator to start an engagement.
     */
    showVisitorCodeViewController(): Promise<void>;
    /**
     * Authenticates visitor.
     * @param options - Provides options for authentication such as behavior, idToken, and accessToken.
     */
    authenticate(options: {
        behavior: AuthenticationBehavior;
        idToken: string;
        accessToken?: string;
    }): Promise<void>;
    /**
     * Deauthenticates visitor. Be aware that deauthentication process relies on `AuthenticationBehavior`
     */
    deauthenticate(): Promise<void>;
    /**
     * Provides current authentication state
     */
    isAuthenticated(): Promise<void>;
    /**
     * Refreshes authentication access properties.
     */
    refreshAuthentication(options: {
        idToken: string;
        accessToken?: string;
    }): Promise<void>;
    /**
     * Makes a pause for ongoing LiveObservation session.
     */
    pauseLiveObservation(): Promise<void>;
    /**
     * Resumes ongoing LiveObservation session.
     */
    resumeLiveObservation(): Promise<void>;
}
