import type { GliaSdk } from './definitions';
import { GliaSdkImpl } from './glia-sdk';

const gliaSdk: GliaSdk = new GliaSdkImpl();

export * from './definitions';
export { gliaSdk as GliaSdk };
