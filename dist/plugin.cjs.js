'use strict';

var core = require('@capacitor/core');

const GliaSdkIonicPlugin = core.registerPlugin('GliaSdk', {
// web: () => import('./web').then((m) => new m.GliaSdkWeb()),
});
class GliaSdkImpl {
    async configure(configuration) {
        let uiUnifiedConfig;
        if (configuration.uiUnifiedConfig) {
            if (typeof configuration.uiUnifiedConfig === 'object') {
                uiUnifiedConfig = JSON.stringify(configuration.uiUnifiedConfig);
            }
            else if (typeof configuration.uiUnifiedConfig === 'string') {
                uiUnifiedConfig = configuration.uiUnifiedConfig;
            }
        }
        return GliaSdkIonicPlugin.configure(Object.assign(Object.assign({}, configuration), { uiUnifiedConfig: uiUnifiedConfig }));
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
}

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
 * Behavior for authentication and deauthentication.
 * FORBIDDEN_DURING_ENGAGEMENT - Do not allow authentication and deauthentication during an ongoing engagement. Default behavior.
 * ALLOWED_DURING_ENGAGEMENT - Allow authentication and deauthentication during an ongoing engagement.
 */
const AuthenticationBehavior = Object.freeze({
    FORBIDDEN_DURING_ENGAGEMENT: 'forbiddenDuringEngagement',
    ALLOWED_DURING_ENGAGEMENT: 'allowedDuringEngagement',
});
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

const GliaSdk = new GliaSdkImpl();

exports.AuthenticationBehavior = AuthenticationBehavior;
exports.GliaSdk = GliaSdk;
exports.MediaType = MediaType;
exports.Region = Region;
//# sourceMappingURL=plugin.cjs.js.map
