'use strict';

var core = require('@capacitor/core');

/**
 * @fileoverview GliaWidgets SDK definitions.
 * This file contains TypeScript interfaces and types used in the Glia Ionic SDK.
 */
/**
 * Site's region. Use `us` for US and other regions except Europe, use `eu` for Europe.
 */
const Region = Object.freeze({
    US: 'us',
    EU: 'eu',
});
/**
 * Authorization method type constants.
 */
const AuthorizationMethodType = Object.freeze({
    /**
     * Site API key authorization (legacy).
     */
    SITE_API_KEY: 'siteApiKey',
    /**
     * User API key authorization.
     */
    USER_API_KEY: 'userApiKey',
});
/**
 * Behavior for authentication and deauthentication.
 * FORBIDDEN_DURING_ENGAGEMENT - Do not allow authentication and deauthentication during an ongoing engagement. Default behavior.
 * ALLOWED_DURING_ENGAGEMENT - Allow authentication and deauthentication during an ongoing engagement.
 */
const AuthenticationBehavior = Object.freeze({
    FORBIDDEN_DURING_ENGAGEMENT: 'forbiddenDuringEngagement',
    ALLOWED_DURING_ENGAGEMENT: 'allowedDuringEngagement',
});
// eslint-disable-next-line @typescript-eslint/no-namespace
exports.Queue = void 0;
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
})(exports.Queue || (exports.Queue = {}));
/**
 * Queue media types.
 */
const MediaType = Object.freeze({
    TEXT: 'text',
    PHONE: 'phone',
    AUDIO: 'audio',
    VIDEO: 'video',
    MESSAGING: 'messaging',
});
// eslint-disable-next-line @typescript-eslint/no-namespace
exports.VisitorInfoUpdate = void 0;
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
})(exports.VisitorInfoUpdate || (exports.VisitorInfoUpdate = {}));
/**
 * Available push notifications types.
 */
const PushNotificationType = Object.freeze({
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
const PushNotificationsIOS = Object.freeze({
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

const GliaSdkIonicPlugin = core.registerPlugin('GliaSdk', {
// web: () => import('./web').then((m) => new m.GliaSdkWeb()),
});
class GliaSdkImpl {
    constructor() {
        this.unreadMessageCountCallbacks = new Set();
        this.unreadMessageCount = null;
        GliaSdkIonicPlugin.addListener('gliaWidgetsUnreadMessageCountChanged', (info) => {
            let count = info.count;
            if (count !== this.unreadMessageCount) {
                this.unreadMessageCountCallbacks.forEach((callback) => callback(count));
                this.unreadMessageCount = count;
            }
        });
    }
    async configure(configuration) {
        // Validate authorization configuration
        const hasAuthMethod = !!configuration.authorizationMethod;
        const hasApiKey = !!configuration.apiKey;
        if (!hasAuthMethod && !hasApiKey) {
            return Promise.reject(new Error("Configuration must include either 'authorizationMethod' or 'apiKey'. " +
                "The 'apiKey' field is deprecated; use 'authorizationMethod' instead."));
        }
        if (hasAuthMethod && hasApiKey) {
            console.warn('[GliaWidgets] Both authorizationMethod and apiKey provided. ' +
                'Using authorizationMethod. The apiKey field is deprecated and will be removed in a future version.');
        }
        if (!hasAuthMethod && hasApiKey) {
            console.warn('[GliaWidgets] The apiKey field is deprecated and will be removed in a future version. ' +
                'Please migrate to authorizationMethod. See documentation for details.');
        }
        // Build native config with authorizationMethod always present
        const nativeConfig = Object.assign({}, configuration);
        if (hasAuthMethod) {
            nativeConfig.authorizationMethod = configuration.authorizationMethod;
        }
        else if (hasApiKey) {
            // Legacy path: transform apiKey to authorizationMethod (Site API Key)
            nativeConfig.authorizationMethod = {
                type: AuthorizationMethodType.SITE_API_KEY,
                id: configuration.apiKey.id,
                secret: configuration.apiKey.secret,
            };
        }
        // Remove apiKey from native config (always use authorizationMethod internally)
        delete nativeConfig.apiKey;
        // Handle uiUnifiedConfig transformation (existing logic)
        let uiUnifiedConfig;
        if (configuration.uiUnifiedConfig) {
            if (typeof configuration.uiUnifiedConfig === 'object') {
                uiUnifiedConfig = JSON.stringify(configuration.uiUnifiedConfig);
            }
            else if (typeof configuration.uiUnifiedConfig === 'string') {
                uiUnifiedConfig = configuration.uiUnifiedConfig;
            }
        }
        return GliaSdkIonicPlugin.configure(Object.assign(Object.assign({}, nativeConfig), { uiUnifiedConfig: uiUnifiedConfig }));
    }
    async subscribeToPushNotificationTypes(options) {
        return GliaSdkIonicPlugin.subscribeToPushNotificationTypes(options);
    }
    async presentEntryWidget() {
        return GliaSdkIonicPlugin.presentEntryWidget();
    }
    async showEntryWidget(options) {
        return GliaSdkIonicPlugin.showEntryWidget(options);
    }
    async hideEntryWidget() {
        return GliaSdkIonicPlugin.hideEntryWidget();
    }
    async startChat(options) {
        if (options) {
            options.useOptions = true;
        }
        return GliaSdkIonicPlugin.startChat(options);
    }
    async startAudio(options) {
        if (options) {
            options.useOptions = true;
        }
        return GliaSdkIonicPlugin.startAudio();
    }
    async startVideo(options) {
        if (options) {
            options.useOptions = true;
        }
        return GliaSdkIonicPlugin.startVideo();
    }
    async startSecureConversation() {
        return GliaSdkIonicPlugin.startSecureConversation();
    }
    async startSecureMessaging(options) {
        return GliaSdkIonicPlugin.startSecureMessaging(options);
    }
    async clearVisitorSession() {
        return GliaSdkIonicPlugin.clearVisitorSession();
    }
    async listQueues() {
        return GliaSdkIonicPlugin.listQueues();
    }
    async getQueues() {
        return GliaSdkIonicPlugin.getQueues();
    }
    async showVisitorCodeViewController() {
        return GliaSdkIonicPlugin.showVisitorCodeViewController();
    }
    async showVisitorCode() {
        return GliaSdkIonicPlugin.showVisitorCode();
    }
    async hideVisitorCode() {
        return GliaSdkIonicPlugin.hideVisitorCode();
    }
    async authenticate(options) {
        return GliaSdkIonicPlugin.authenticate(options);
    }
    async deauthenticate(options) {
        return GliaSdkIonicPlugin.deauthenticate(options);
    }
    async isAuthenticated() {
        const result = await GliaSdkIonicPlugin.isAuthenticatedInternal();
        return result.isAuthenticated;
    }
    async refreshAuthentication(options) {
        return GliaSdkIonicPlugin.refreshAuthentication(options);
    }
    async pauseLiveObservation() {
        return GliaSdkIonicPlugin.pauseLiveObservation();
    }
    async resumeLiveObservation() {
        return GliaSdkIonicPlugin.resumeLiveObservation();
    }
    async getVisitorInfo() {
        return GliaSdkIonicPlugin.getVisitorInfo();
    }
    async updateVisitorInfo(visitorInfo) {
        return GliaSdkIonicPlugin.updateVisitorInfo(visitorInfo);
    }
    async endEngagement() {
        return GliaSdkIonicPlugin.endEngagement();
    }
    subscribeToUnreadMessageCount(callback) {
        if (this.unreadMessageCount !== null) {
            callback(this.unreadMessageCount);
        }
        this.unreadMessageCountCallbacks.add(callback);
    }
    unsubscribeFromUnreadMessageCount(callback) {
        this.unreadMessageCountCallbacks.delete(callback);
    }
}

const gliaSdk = new GliaSdkImpl();

exports.AuthenticationBehavior = AuthenticationBehavior;
exports.AuthorizationMethodType = AuthorizationMethodType;
exports.GliaSdk = gliaSdk;
exports.MediaType = MediaType;
exports.PushNotificationType = PushNotificationType;
exports.PushNotificationsIOS = PushNotificationsIOS;
exports.Region = Region;
//# sourceMappingURL=plugin.cjs.js.map
