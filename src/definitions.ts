export interface GliaSdkPlugin {
  echo(options: { value: string }): Promise<{ value: string }>;
}
