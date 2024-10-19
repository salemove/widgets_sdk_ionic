import { registerPlugin } from '@capacitor/core';

import type { GliaSdkPlugin } from './definitions';

const GliaSdk = registerPlugin<GliaSdkPlugin>('GliaSdk', {
  web: () => import('./web').then((m) => new m.GliaSdkWeb()),
});

export * from './definitions';
export { GliaSdk };
