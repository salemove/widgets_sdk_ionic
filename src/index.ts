import { GliaSdk } from './definitions';
import { GliaSdkImpl } from './glia-sdk';

const GliaSdk: GliaSdk = new GliaSdkImpl();

export * from './definitions';
export { GliaSdk };
