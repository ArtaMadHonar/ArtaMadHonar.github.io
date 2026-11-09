// @ts-check
import { defineConfig } from 'astro/config';
import react from '@astrojs/react';
import tailwindcss from '@tailwindcss/vite';
import sitemap from '@astrojs/sitemap';
import fs from 'node:fs';
import path from 'node:path';

/** Vite dev middleware plugin for local admin API endpoints */
function adminDevApiPlugin() {
  return {
    name: 'admin-dev-api',
    configureServer(server) {
      server.middlewares.use((req, res, next) => {
        const url = req.url ? req.url.split('?')[0] : '';

        // 1. GET /api/admin/data
        if (req.method === 'GET' && url === '/api/admin/data') {
          try {
            const dataPath = path.resolve('src/data/studioContent.json');
            if (fs.existsSync(dataPath)) {
              const content = fs.readFileSync(dataPath, 'utf8');
              res.setHeader('Content-Type', 'application/json; charset=utf-8');
              res.end(content);
              return;
            }
            res.statusCode = 404;
            res.end(JSON.stringify({ error: 'File not found' }));
            return;
          } catch (err) {
            res.statusCode = 500;
            res.end(JSON.stringify({ error: err.message }));
            return;
          }
        }

        // 2. POST /api/admin/save
        if (req.method === 'POST' && url === '/api/admin/save') {
          let body = '';
          req.on('data', (chunk) => { body += chunk; });
          req.on('end', () => {
            try {
              const parsed = JSON.parse(body);
              const dataPath = path.resolve('src/data/studioContent.json');
              fs.writeFileSync(dataPath, JSON.stringify(parsed, null, 2), 'utf8');

              res.setHeader('Content-Type', 'application/json; charset=utf-8');
              res.end(JSON.stringify({ success: true, message: 'تغییرات با موفقیت ذخیره شد' }));
            } catch (err) {
              res.statusCode = 500;
              res.end(JSON.stringify({ error: err.message }));
            }
          });
          return;
        }

        // 3. POST /api/admin/upload
        if (req.method === 'POST' && url === '/api/admin/upload') {
          let body = '';
          req.on('data', (chunk) => { body += chunk; });
          req.on('end', () => {
            try {
              const { filename, base64 } = JSON.parse(body);
              const cleanName = (filename || 'file.webp').replace(/[^a-zA-Z0-9._-]/g, '_');
              const uniqueName = `${Date.now()}_${cleanName}`;
              const uploadDir = path.resolve('public/assets/uploads');
              if (!fs.existsSync(uploadDir)) {
                fs.mkdirSync(uploadDir, { recursive: true });
              }
              const filePath = path.join(uploadDir, uniqueName);
              const buffer = Buffer.from(base64.replace(/^data:[^;]+;base64,/, ''), 'base64');
              fs.writeFileSync(filePath, buffer);

              res.setHeader('Content-Type', 'application/json; charset=utf-8');
              res.end(JSON.stringify({ success: true, url: `/assets/uploads/${uniqueName}` }));
            } catch (err) {
              res.statusCode = 500;
              res.end(JSON.stringify({ error: err.message }));
            }
          });
          return;
        }

        // 4. Inquiries endpoints
        if (url === '/api/admin/inquiries') {
          const inqPath = path.resolve('src/data/inquiries.json');
          if (req.method === 'GET') {
            const list = fs.existsSync(inqPath) ? JSON.parse(fs.readFileSync(inqPath, 'utf8')) : [];
            res.setHeader('Content-Type', 'application/json; charset=utf-8');
            res.end(JSON.stringify({ success: true, inquiries: list }));
            return;
          }
          if (req.method === 'POST') {
            let body = '';
            req.on('data', (chunk) => { body += chunk; });
            req.on('end', () => {
              try {
                const newInq = JSON.parse(body);
                const list = fs.existsSync(inqPath) ? JSON.parse(fs.readFileSync(inqPath, 'utf8')) : [];
                list.unshift({ id: Date.now().toString(), createdAt: new Date().toISOString(), ...newInq });
                fs.writeFileSync(inqPath, JSON.stringify(list, null, 2), 'utf8');
                res.setHeader('Content-Type', 'application/json; charset=utf-8');
                res.end(JSON.stringify({ success: true }));
              } catch (err) {
                res.statusCode = 500;
                res.end(JSON.stringify({ error: err.message }));
              }
            });
            return;
          }
        }

        // 5. POST /api/inquiry (client inquiry form dispatch)
        if (req.method === 'POST' && url === '/api/inquiry') {
          let body = '';
          req.on('data', (chunk) => { body += chunk; });
          req.on('end', () => {
            try {
              const newInq = JSON.parse(body);
              const inqPath = path.resolve('src/data/inquiries.json');
              const list = fs.existsSync(inqPath) ? JSON.parse(fs.readFileSync(inqPath, 'utf8')) : [];
              list.unshift({ id: Date.now().toString(), createdAt: new Date().toISOString(), ...newInq });
              fs.writeFileSync(inqPath, JSON.stringify(list, null, 2), 'utf8');
              res.setHeader('Content-Type', 'application/json; charset=utf-8');
              res.end(JSON.stringify({ success: true }));
            } catch (err) {
              res.statusCode = 500;
              res.end(JSON.stringify({ error: err.message }));
            }
          });
          return;
        }

        next();
      });
    },
  };
}

// https://astro.build/config
export default defineConfig({
  site: 'https://artamad.ir',
  integrations: [react(), sitemap()],
  vite: {
    plugins: [tailwindcss(), adminDevApiPlugin()],
  },
  server: {
    port: 3000,
    host: true,
  },
});

