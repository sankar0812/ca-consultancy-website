import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [
    react(),
    {
      name: 'api-enquiry-dev-middleware',
      configureServer(server) {
        server.middlewares.use(async (req, res, next) => {
          if (req.url && req.url.startsWith('/api/enquiry')) {
            if (req.method === 'OPTIONS') {
              res.setHeader('Access-Control-Allow-Origin', '*');
              res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
              res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
              res.statusCode = 200;
              res.end();
              return;
            }

            if (req.method === 'POST') {
              let body = '';
              req.on('data', (chunk) => {
                body += chunk;
              });
              req.on('end', async () => {
                try {
                  req.body = JSON.parse(body || '{}');
                } catch {
                  req.body = {};
                }

                res.status = function (code) {
                  this.statusCode = code;
                  return this;
                };
                res.json = function (data) {
                  this.setHeader('Content-Type', 'application/json');
                  this.end(JSON.stringify(data));
                  return this;
                };

                try {
                  const { default: handler } = await import('./api/enquiry.js');
                  await handler(req, res);
                } catch (err) {
                  console.error('API Error in dev middleware:', err);
                  res.statusCode = 500;
                  res.setHeader('Content-Type', 'application/json');
                  res.end(JSON.stringify({ ok: false, message: err.message }));
                }
              });
              return;
            }
          }
          next();
        });
      },
    },
  ],
  build: {
    sourcemap: false,
    chunkSizeWarningLimit: 600,
  },
});
