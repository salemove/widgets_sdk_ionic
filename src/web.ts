import { WebPlugin } from '@capacitor/core';

import type { GliaSdkPlugin } from './definitions';

export class GliaSdkWeb extends WebPlugin implements GliaSdkPlugin {
  async echo(options: { value: string }): Promise<{ value: string }> {
    console.log('ECHO', options);
    return options;
  }
}
