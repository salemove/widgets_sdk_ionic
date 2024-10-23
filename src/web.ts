import { WebPlugin } from '@capacitor/core';

import type { GliaSdkPlugin, ApiKey, Region, AuthenticationBehavior } from './definitions';

export class GliaSdkWeb extends WebPlugin implements GliaSdkPlugin {
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

  async startChat(options: { queueIds?: string[] }): Promise<void> {
    console.log(options);
    console.log("Web doesn't support GliaWidget SDK. Use Glia JS SDK instead.");
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
}
