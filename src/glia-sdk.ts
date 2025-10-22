import { Plugin, registerPlugin } from '@capacitor/core';

import type {
    AuthenticationBehavior,
    Configuration,
    GliaSdk,
    Queues,
    VisitorInfo,
    VisitorInfoUpdate,
    PushNotificationType,
    UnreadMessageCountCallback
} from './definitions';

const GliaSdkIonicPlugin = registerPlugin<GliaSdkPluginInternal>('GliaSdk', {
    // web: () => import('./web').then((m) => new m.GliaSdkWeb()),
});

interface GliaSdkPluginInternal extends GliaSdk, Plugin {
    isAuthenticatedInternal(): Promise<{ isAuthenticated: boolean }>;
}

export class GliaSdkImpl implements GliaSdk {
    private unreadMessageCountCallbacks: Set<UnreadMessageCountCallback> = new Set();
    private unreadMessageCount: number | null = null;

    constructor() {
        GliaSdkIonicPlugin.addListener('gliaWidgetsUnreadMessageCountChanged', (info: { count: number }) => {
            let count = info.count;
            if (count !== this.unreadMessageCount) {
                this.unreadMessageCountCallbacks.forEach((callback) =>
                    callback(count)
                );
                this.unreadMessageCount = count;
            }
        });
    }

    async configure(configuration: Configuration): Promise<void> {
        let uiUnifiedConfig: string | undefined;
        if (configuration.uiUnifiedConfig) {
            if (typeof configuration.uiUnifiedConfig === 'object') {
                uiUnifiedConfig = JSON.stringify(configuration.uiUnifiedConfig);
            } else if (typeof configuration.uiUnifiedConfig === 'string') {
                uiUnifiedConfig = configuration.uiUnifiedConfig;
            }
        }
        return GliaSdkIonicPlugin.configure({
            ...configuration,
            uiUnifiedConfig: uiUnifiedConfig,
        });
    }

    async subscribeToPushNotificationTypes(options: {
        types: PushNotificationType[];
    }): Promise<void> {
        return GliaSdkIonicPlugin.subscribeToPushNotificationTypes(options);
    }

    async presentEntryWidget(): Promise<void> {
        return GliaSdkIonicPlugin.presentEntryWidget();
    }

    async showEntryWidget(options: { queueIds?: string[] }): Promise<void> {
        return GliaSdkIonicPlugin.showEntryWidget(options);
    }

    async hideEntryWidget(): Promise<void> {
        return GliaSdkIonicPlugin.hideEntryWidget();
    }

    async startChat(options?: { queueIds?: string[]; useOptions?: boolean }): Promise<void> {
        if (options) {
            options.useOptions = true;
        }
        return GliaSdkIonicPlugin.startChat(options);
    }

    async startAudio(options?: { queueIds?: string[]; useOptions?: boolean }): Promise<void> {
        if (options) {
            options.useOptions = true;
        }
        return GliaSdkIonicPlugin.startAudio();
    }

    async startVideo(options?: { queueIds?: string[]; useOptions?: boolean }): Promise<void> {
        if (options) {
            options.useOptions = true;
        }
        return GliaSdkIonicPlugin.startVideo();
    }

    async startSecureConversation(): Promise<void> {
        return GliaSdkIonicPlugin.startSecureConversation();
    }

    async startSecureMessaging(options: { queueIds?: string[] }): Promise<void> {
        return GliaSdkIonicPlugin.startSecureMessaging(options);
    }

    async clearVisitorSession(): Promise<void> {
        return GliaSdkIonicPlugin.clearVisitorSession();
    }

    async listQueues(): Promise<any> {
        return GliaSdkIonicPlugin.listQueues();
    }

    async getQueues(): Promise<Queues> {
        return GliaSdkIonicPlugin.getQueues();
    }

    async showVisitorCodeViewController(): Promise<void> {
        return GliaSdkIonicPlugin.showVisitorCodeViewController();
    }

    async showVisitorCode(): Promise<void> {
        return GliaSdkIonicPlugin.showVisitorCode();
    }

    async hideVisitorCode(): Promise<void> {
        return GliaSdkIonicPlugin.hideVisitorCode();
    }

    async authenticate(options: {
        behavior: AuthenticationBehavior;
        idToken: string;
        accessToken?: string;
    }): Promise<void> {
        return GliaSdkIonicPlugin.authenticate(options);
    }

    async deauthenticate(options?: {
        stopPushNotifications: boolean;
    }): Promise<void> {
        return GliaSdkIonicPlugin.deauthenticate(options);
    }

    async isAuthenticated(): Promise<boolean> {
        const result = await GliaSdkIonicPlugin.isAuthenticatedInternal();
        return result.isAuthenticated;
    }

    async refreshAuthentication(options: { idToken: string; accessToken?: string }): Promise<void> {
        return GliaSdkIonicPlugin.refreshAuthentication(options);
    }

    async pauseLiveObservation(): Promise<void> {
        return GliaSdkIonicPlugin.pauseLiveObservation();
    }

    async resumeLiveObservation(): Promise<void> {
        return GliaSdkIonicPlugin.resumeLiveObservation();
    }

    async getVisitorInfo(): Promise<VisitorInfo> {
        return GliaSdkIonicPlugin.getVisitorInfo();
    }

    async updateVisitorInfo(visitorInfo: VisitorInfoUpdate): Promise<void> {
        return GliaSdkIonicPlugin.updateVisitorInfo(visitorInfo);
    }

    async endEngagement(): Promise<void> {
        return GliaSdkIonicPlugin.endEngagement();
    }

    subscribeToUnreadMessageCount(callback: UnreadMessageCountCallback) {
        if (this.unreadMessageCount !== null) {
            callback(this.unreadMessageCount);
        }
        this.unreadMessageCountCallbacks.add(callback);
    }

    unsubscribeFromUnreadMessageCount(callback: UnreadMessageCountCallback) {
        this.unreadMessageCountCallbacks.delete(callback);
    }
}
