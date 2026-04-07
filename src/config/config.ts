import { Env, LogLevel, parseEnv } from '@project-init/tommon';
import type { LoggingConfig, ServiceConfig } from '@project-init/tommon';

export const APP_NAME = 'admin-platform';

export interface AppConfig {
  service: ServiceConfig;
  logging: LoggingConfig;
  metrics: MetricsConfig;
}

export interface MetricsConfig {
  grpcMetricsInterceptorEnabled: boolean;
}

const REQUIRED_ENV_VARS = [
  'ENV',
  'AWS_REGION',
  'VERSION',
  'LOG_LEVEL',
] as const;

let config: AppConfig | undefined;

export function getConfig(): AppConfig {
  if (config !== undefined) {
    return config;
  }

  throw new Error('getConfig called before config is initialized.');
}

export function validateConfig(): void {
  // Skip validation and initialization if config is already set
  if (config !== undefined) {
    return;
  }

  // Check for missing environment variables
  const missingVars = REQUIRED_ENV_VARS.filter((name) => {
    const value = process.env[name];
    return typeof value !== 'string' || value.trim().length === 0;
  });

  if (missingVars.length > 0) {
    throw new Error(
      `Missing required environment variables: ${missingVars.join(', ')}`,
    );
  }

  // Validate and parse environment variables
  const serviceEnv = parseEnv(process.env.ENV!);
  const grpcMetricsInterceptorEnabled =
    process.env.GRPC_METRICS_INTERCEPTOR_ENABLED === 'true';

  // Initialize config object
  config = {
    service: {
      env: serviceEnv,
      region: process.env.AWS_REGION!.trim(),
      version: process.env.VERSION!.trim(),
    },
    logging: {
      level: process.env.LOG_LEVEL!.trim() as LogLevel,
      addSource: false,
    },
    metrics: {
      grpcMetricsInterceptorEnabled,
    },
  };

  console.log('Configuration validated and initialized successfully.');
}
