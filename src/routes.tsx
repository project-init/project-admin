import { html } from '@elysiajs/html';
import { staticPlugin } from '@elysiajs/static';
import {
  createLogger,
  elysiaRequestLogger,
  httpMetricsPlugin,
  metricsPlugin,
} from '@project-init/tommon';
import { Elysia } from 'elysia';
import { healthcheckPlugin } from './api/healthcheck';
import { getConfig } from './config/config';
import { LandingPage } from './pages/LandingPage';

export function createApp() {
  const log = createLogger(getConfig().logging);

  const app = new Elysia({})
    .use(httpMetricsPlugin)
    .use(elysiaRequestLogger(log))
    .use(html())
    .use(
      staticPlugin({
        prefix: '/',
        indexHTML: false,
      }),
    )
    .use(healthcheckPlugin)
    .use(metricsPlugin);

  return app.get('/', () => <LandingPage />);
}
