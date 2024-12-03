import { registerPlugin } from '@capacitor/core';
const GliaSdk = registerPlugin('GliaSdk', {
// web: () => import('./web').then((m) => new m.GliaSdkWeb()),
});
export * from './definitions';
export { GliaSdk };
//# sourceMappingURL=index.js.map