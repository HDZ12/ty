export type AppEnvironment = 'development' | 'test' | 'production';

export interface AppConfig {
  appEnv: AppEnvironment;
  host: string;
  port: number;
}

export function readConfig(env: NodeJS.ProcessEnv = process.env): AppConfig {
  const appEnv = env.APP_ENV ?? 'development';
  if (!['development', 'test', 'production'].includes(appEnv)) {
    throw new Error('APP_ENV must be development, test, or production');
  }

  const portText = env.PORT ?? '3000';
  const port = Number(portText);
  if (
    !/^\d+$/.test(portText) ||
    !Number.isInteger(port) ||
    port < 1 ||
    port > 65535
  ) {
    throw new Error('PORT must be an integer between 1 and 65535');
  }

  const host = env.HOST ?? '127.0.0.1';
  if (!host.trim()) throw new Error('HOST must not be empty');

  return { appEnv: appEnv as AppEnvironment, host, port };
}
