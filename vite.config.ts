import { Connect, defineConfig, Plugin } from 'vite';
import path from 'path';
import fs from 'fs';
import react from '@vitejs/plugin-react';

const redirectMiddleware: Connect.NextHandleFunction = (req, res, next) => {
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
};

const devServerPlugin = (): Plugin => ({
  name: 'configure-server',
  configureServer(server) {
    server.middlewares.use(redirectMiddleware);
  },
});

const previewServerPlugin = (): Plugin => ({
  name: 'configure-preview-server',
  configurePreviewServer(server) {
    server.middlewares.use(redirectMiddleware);
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
  plugins: [
    react({
      babel: {
        plugins: ['babel-plugin-styled-components'],
      },
    }),
    devServerPlugin(),
    previewServerPlugin(),
  ],
  resolve: {
    alias: aliasDirectories,
  },
});
