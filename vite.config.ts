import { defineConfig } from 'vite';
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

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react(), rootRedirectPlugin()],
});
