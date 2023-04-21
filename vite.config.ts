import { defineConfig } from 'vite';
import path from 'path';
import fs from 'fs';
import react from '@vitejs/plugin-react';

const rootRedirectPlugin = () => ({
  name: 'configure-server',
  configureServer(server) {
    server.middlewares.use((req, res, next) => {
      const [path] = req.url.split('?');
      if (path === '/') {
        res
          .writeHead(302, {
            Location: '/jokes',
          })
          .end();
      } else {
        next();
      }
    });
  },
});

const aliasDirectories = fs
  .readdirSync(path.resolve(__dirname, 'src'), { withFileTypes: true })
  .filter((file) => file.isDirectory())
  .map((dir) => dir.name)
  .reduce(
    (acc, current) => ({
      ...acc,
      [current]: path.resolve(__dirname, 'src', current),
    }),
    {},
  );

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react(), rootRedirectPlugin()],
  resolve: {
    alias: aliasDirectories,
  },
});
