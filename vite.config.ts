import { defineConfig } from 'vite';
import path from 'path';
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

const aliasDirectories = ['common', 'config', 'context', 'layouts', 'pages'];

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react(), rootRedirectPlugin()],
  resolve: {
    alias: aliasDirectories.reduce(
      (acc, current) => ({
        ...acc,
        [current]: path.resolve(__dirname, 'src', current),
      }),
      {},
    ),
  },
});
