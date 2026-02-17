/**
 * @fileoverview GliaWidgets SDK definitions.
 * This file contains TypeScript interfaces and types used in the Glia Ionic SDK.
 */
/**
 * Site's region. Use `us` for US and other regions except Europe, use `eu` for Europe.
 */
export const Region = Object.freeze({
    US: 'us',
    EU: 'eu',
});
/**
 * Authorization method type constants.
 */
export const AuthorizationMethodType = Object.freeze({
    /**
     * Site API key authorization (legacy).
     */
    SITE_API_KEY: 'siteApiKey',
    /**
     * User API key authorization.
     */
    USER_API_KEY: 'userApiKey',
});
export var AuthorizationMethod;
(function (AuthorizationMethod) {
    /**
     * Creates a Site API key authorization configuration.
     *
     * @param id - The site API key ID.
     * @param secret - The site API key secret.
     */
    function siteApiKey(id, secret) {
        return { type: AuthorizationMethodType.SITE_API_KEY, id, secret };
    }
    AuthorizationMethod.siteApiKey = siteApiKey;
    /**
     * Creates a User API key authorization configuration.
     *
     * @param id - The user API key ID.
     * @param secret - The user API key secret.
     */
    function userApiKey(id, secret) {
        return { type: AuthorizationMethodType.USER_API_KEY, id, secret };
    }
    AuthorizationMethod.userApiKey = userApiKey;
})(AuthorizationMethod || (AuthorizationMethod = {}));
/**
 * Behavior for authentication and deauthentication.
 * FORBIDDEN_DURING_ENGAGEMENT - Do not allow authentication and deauthentication during an ongoing engagement. Default behavior.
 * ALLOWED_DURING_ENGAGEMENT - Allow authentication and deauthentication during an ongoing engagement.
 */
export const AuthenticationBehavior = Object.freeze({
    FORBIDDEN_DURING_ENGAGEMENT: 'forbiddenDuringEngagement',
    ALLOWED_DURING_ENGAGEMENT: 'allowedDuringEngagement',
});
// eslint-disable-next-line @typescript-eslint/no-namespace
export var Queue;
(function (Queue) {
    /**
     * Queue status.
     */
    Queue.Status = Object.freeze({
        OPENED: 'opened',
        CLOSED: 'closed',
        FULL: 'full',
        UNSTAFFED: 'unstaffed',
    });
})(Queue || (Queue = {}));
/**
 * Queue media types.
 */
export const MediaType = Object.freeze({
    TEXT: 'text',
    PHONE: 'phone',
    AUDIO: 'audio',
    VIDEO: 'video',
    MESSAGING: 'messaging',
});
// eslint-disable-next-line @typescript-eslint/no-namespace
export var VisitorInfoUpdate;
(function (VisitorInfoUpdate) {
    /**
     * Specifies a method for updating the visitor's notes.
     * replace - The visitor's notes will be overwritten with the notes specified in the request.
     * append - A line break (\n) will be added, and the specified notes will be appended to the existing visitor’s notes.
     */
    VisitorInfoUpdate.NoteUpdateMethod = Object.freeze({
        REPLACE: 'replace',
        APPEND: 'append',
    });
    /**
     * Specifies a method for updating the visitor's custom attributes.
     * replace - All custom attributes for the visitor will be overwritten with the attributes specified in the request.
     * merge - Only custom attributes present in the request will be added or updated. Custom attributes can be removed by setting their values to `null`.
     */
    VisitorInfoUpdate.CustomAttributesUpdateMethod = Object.freeze({
        REPLACE: 'replace',
        MERGE: 'merge',
    });
})(VisitorInfoUpdate || (VisitorInfoUpdate = {}));
/**
 * Available push notifications types.
 */
export const PushNotificationType = Object.freeze({
    /**
     * The SDK will subscribe to push notifications for when the engagement starts.
     */
    START: 'start',
    /**
     * The SDK will subscribe to push notifications for when the engagement ends.
     */
    END: 'end',
    /**
     * The SDK will subscribe to push notifications for when the engagement fails.
     */
    FAILED: 'failed',
    /**
     * The SDK will subscribe to push notifications for when a new message is received.
     */
    MESSAGE: 'message',
    /**
     * The SDK will subscribe to push notifications for when the engagement is transferred to another operator.
     */
    TRANSFER: 'transfer',
});
/**
 * Push notifications environment for iOS.
 */
export const PushNotificationsIOS = Object.freeze({
    /**
     * Push notifications are disabled.
     */
    DISABLED: 'disabled',
    /**
     * Push notifications are configured for sandbox environment. Suitable for testing.
     */
    SANDBOX: 'sandbox',
    /**
     * Push notifications are configured for production environment.
     */
    PRODUCTION: 'production',
});
//# sourceMappingURL=definitions.js.map