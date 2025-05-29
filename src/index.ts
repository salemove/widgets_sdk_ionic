import type { GliaSdkPlugin } from './definitions';
import { GliaSdkImpl } from './glia-sdk';

const GliaSdk: GliaSdkPlugin = new GliaSdkImpl();

export * from './definitions';
export { GliaSdk };
