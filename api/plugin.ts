import type { Plugin } from 'vite';
import { createApiApp } from './routes';

/** Vite dev-server plugin that mounts the JSON-file API on /api */
export default function wcvApiPlugin(): Plugin {
  return {
    name: 'wcv-api',
    configureServer(server) {
      const apiApp = createApiApp();
      server.middlewares.use('/api', apiApp);
    },
    configurePreviewServer(server) {
      const apiApp = createApiApp();
      server.middlewares.use('/api', apiApp);
    },
  };
}
