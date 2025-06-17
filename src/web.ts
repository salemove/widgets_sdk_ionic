import { WebPlugin } from '@capacitor/core';

import type { GliaSdk, ApiKey, Region, Queues, PushNotificationType, AuthenticationBehavior, VisitorInfo, VisitorInfoUpdate } from './definitions';

export class GliaSdkWeb extends WebPlugin implements GliaSdk {

    async configure(options: {
        siteId: string;
        apiKey: ApiKey;
        region: Region;
        companyName: string;
        overrideLocale?: string;
    }): Promise<void> {
        console.log(options);
        console.log("Web doesn't support GliaWidget SDK. Use Glia JS SDK instead.");
    }

    async subscribeToPushNotificationTypes(options: {
        types: PushNotificationType[],
    }): Promise<void> {
        console.log(options);
        console.log("Web doesn't support GliaWidget SDK. Use Glia JS SDK instead.");
    }

    async presentEntryWidget(): Promise<void> {
        console.log("Web doesn't support GliaWidget SDK. Use Glia JS SDK instead.");
    }


    async showEntryWidget(options: {
        queueIds?: string[];
    }): Promise<void> {
        console.log(options);
        console.log("Web doesn't support GliaWidget SDK. Use Glia JS SDK instead.");
    }

    async hideEntryWidget(): Promise<void> {
        console.log("Web doesn't support GliaWidget SDK. Use Glia JS SDK instead.");
    }

    async startSecureConversation(): Promise<void> {
        console.log("Web doesn't support GliaWidget SDK. Use Glia JS SDK instead.");
    }

    async startSecureMessaging(options: {
        queueIds?: string[];
    }): Promise<void> {
        console.log(options);
        console.log("Web doesn't support GliaWidget SDK. Use Glia JS SDK instead.");
    }

    async startChat(options: { queueIds?: string[] }): Promise<void> {
        console.log(options);
        console.log("Web doesn't support GliaWidget SDK. Use Glia JS SDK instead.");
    }

    async getQueues(): Promise<Queues> {
        console.log("Web doesn't support GliaWidget SDK. Use Glia JS SDK instead.");
        return {} as Queues;
    }

    async startAudio(options: { queueIds?: string[] }): Promise<void> {
        console.log(options);
        console.log("Web doesn't support GliaWidget SDK. Use Glia JS SDK instead.");
    }

    async startVideo(options: { queueIds?: string[] }): Promise<void> {
        console.log(options);
        console.log("Web doesn't support GliaWidget SDK. Use Glia JS SDK instead.");
    }

    async clearVisitorSession(): Promise<void> {
        console.log("Web doesn't support GliaWidget SDK. Use Glia JS SDK instead.");
    }

    async listQueues(): Promise<any> {
        console.log("Web doesn't support GliaWidget SDK. Use Glia JS SDK instead.");
    }

    async authenticate(options: {
        behavior: AuthenticationBehavior;
        idToken: string;
        accessToken?: string;
    }): Promise<void> {
        console.log(options);
        console.log("Web doesn't support GliaWidget SDK. Use Glia JS SDK instead.");
    }

    async showVisitorCodeViewController(): Promise<void> {
        console.log("Web doesn't support GliaWidget SDK. Use Glia JS SDK instead.");
    }

    async showVisitorCode(): Promise<void> {
        console.log("Web doesn't support GliaWidget SDK. Use Glia JS SDK instead.");
    }

    async deauthenticate(options?: { stopPushNotifications: boolean; }): Promise<void> {
        console.log(options);
        console.log("Web doesn't support GliaWidget SDK. Use Glia JS SDK instead.");
    }

    async isAuthenticated(): Promise<boolean> {
        console.log("Web doesn't support GliaWidget SDK. Use Glia JS SDK instead.");
        return false;
    }
    async refreshAuthentication(options: { idToken: string; accessToken?: string | undefined; }): Promise<void> {
        console.log(options);
        console.log("Web doesn't support GliaWidget SDK. Use Glia JS SDK instead.");
    }

    async pauseLiveObservation(): Promise<void> {
        console.log("Web doesn't support GliaWidget SDK. Use Glia JS SDK instead.");
    }

    async resumeLiveObservation(): Promise<void> {
        console.log("Web doesn't support GliaWidget SDK. Use Glia JS SDK instead.");
    }

    async getVisitorInfo(): Promise<VisitorInfo> {
        console.log("Web doesn't support GliaWidget SDK. Use Glia JS SDK instead.");
        return {} as VisitorInfo;
    }

    async updateVisitorInfo(visitorInfo: VisitorInfoUpdate): Promise<void> {
        console.log(visitorInfo);
        console.log("Web doesn't support GliaWidget SDK. Use Glia JS SDK instead.");
    }

    async endEngagement(): Promise<void> {
        console.log("Web doesn't support GliaWidget SDK. Use Glia JS SDK instead.");
    }

}
