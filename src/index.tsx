import { validateConfig } from './config/config';
import { createApp } from './routes';

// Validate configuration before starting the server
validateConfig();

createApp().listen({}, ({ url: { origin } }) =>
  console.log(`Server is running at ${origin}`),
);
