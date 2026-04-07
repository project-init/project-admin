import { Elysia } from 'elysia';

export type HealthcheckResponse = {
  status: 'ok';
  uptimeSeconds: number;
  timestamp: string;
  version: string;
};

export const healthcheckPlugin = new Elysia({
  name: 'healthcheck',
}).get('/healthcheck', () => {
  const body: HealthcheckResponse = {
    status: 'ok',
    uptimeSeconds: Math.floor(process.uptime()),
    timestamp: new Date().toISOString(),
    version: process.env.VERSION || 'undefined',
  };

  return body; // Elysia will serialize to JSON
});
