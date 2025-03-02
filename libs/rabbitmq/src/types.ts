export interface RabbitMqModuleOptions {
  queue: string;
}

export interface RabbitMqModuleAsyncOptions {
  provide: string;
  inject: any[];
  imports: any[];
  useFactory: (
    ...args: any[]
  ) => Promise<RabbitMqModuleOptions> | RabbitMqModuleOptions;
}
