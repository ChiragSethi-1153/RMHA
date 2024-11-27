export interface ConfigType {
  username: string;
  password: string;
  appName: string;
  fanoutExchange: string;
  heartbeatInterval: number;
  dsn: string;
  directExchange: string;
  primaryQueue: string;
  retryQueue: string;
  retryBindingKey: string;
  errorBindingKey: string;
  delayedRetriesNumber: number;
  immediateRetriesNumber: number;
  retryQueueMessageTtl: number;
  consumeMessageLimit: number;
  dispatchMessageLimit: number;
}

export interface QueueConfig {
  durable: boolean;
  deadLetterExchange?: string;
  messageTtl?: number;
}
