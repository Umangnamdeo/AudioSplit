import tailwindcss from '@tailwindcss/vite';
import react from '@vitejs/plugin-react';
import path from 'path';
import { defineConfig } from 'vite';

function googleVerificationPlugin() {
  const verificationFile = process.env.GOOGLE_SITE_VERIFICATION || 'google4ddf6a8fb9c58e46.html';
  return {
    name: 'google-site-verification-plugin',
    configureServer(server: any) {
      server.middlewares.use((req: any, res: any, next: any) => {
        const cleanUrl = req.url?.split('?')[0];
        if (cleanUrl === `/${verificationFile}` || cleanUrl === `/AudioSplit/${verificationFile}`) {
          res.setHeader('Content-Type', 'text/html; charset=utf-8');
          res.end(`google-site-verification: ${verificationFile}\n`);
          return;
        }
        next();
      });
    },
    generateBundle() {
      this.emitFile({
        type: 'asset',
        fileName: verificationFile,
        source: `google-site-verification: ${verificationFile}\n`,
      });
    },
  };
}

export default defineConfig(() => {
  return {
    base: process.env.GITHUB_ACTIONS ? '/AudioSplit/' : './',
    plugins: [react(), tailwindcss(), googleVerificationPlugin()],
    server: {
      port: 3000,
      host: '0.0.0.0',
    },
    preview: {
      port: 3000,
      host: '0.0.0.0',
    },
    resolve: {
      alias: {
        '@': path.resolve(__dirname, '.'),
      },
    },
  };
});

