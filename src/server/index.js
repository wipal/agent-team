/**
 * Express Server for Agent Team UI Dashboard
 * Lightweight server with HTMX-based UI
 */

import express from 'express';
import path from 'path';
import { fileURLToPath } from 'url';
import open from 'open';
import agentsRouter from './api/agents.js';
import rolesRouter from './api/roles.js';
import skillsRouter from './api/skills.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const DEFAULT_PORT = 3456;

/**
 * Create Express app
 */
export function createApp(projectRoot = process.cwd()) {
  const app = express();

  // Store project root for use in routes
  app.set('projectRoot', projectRoot);

  // Middleware
  app.use(express.json());
  app.use(express.urlencoded({ extended: true }));

  // Static files
  const uiDir = path.join(__dirname, '..', 'ui');
  app.use('/ui', express.static(uiDir));

  // API Routes
  app.use('/api/agents', agentsRouter);
  app.use('/api/roles', rolesRouter);
  app.use('/api/skills', skillsRouter);

  // Main page redirect
  app.get('/', (req, res) => {
    res.redirect('/ui/');
  });

  return app;
}

/**
 * Start server
 */
export async function startServer(options = {}) {
  const { port = DEFAULT_PORT, open: openBrowser = true, projectRoot = process.cwd() } = options;

  const app = createApp(projectRoot);

  return new Promise((resolve) => {
    const server = app.listen(port, () => {
      const url = `http://localhost:${port}`;
      console.log('');
      console.log(`🚀 Agent Team UI running at: ${url}`);
      console.log('');

      if (openBrowser) {
        open(url).catch(() => {
          console.log(`Please open ${url} in your browser`);
        });
      }

      resolve({ server, url });
    });
  });
}

// Run if called directly
if (import.meta.url === `file://${process.argv[1]}`) {
  startServer();
}
