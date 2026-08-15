import { defineConfig } from 'vitest/config';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  server: {
    // Listen on all interfaces so the dev server is reachable from the
    // container. The host-side port binding in docker-compose.yml controls
    // who can actually reach it.
    host: true,
    port: 3000,
    strictPort: true,
    watch: {
      // Bind-mounted source on Docker Desktop needs polling to see changes.
      usePolling: process.env.CHOKIDAR_USEPOLLING === 'true',
    },
  },
  preview: {
    host: true,
    port: 3000,
  },
  build: {
    outDir: 'dist',
    // Do not publish original source to production. See Dockerfile.
    sourcemap: false,
  },
  test: {
    globals: true,
    environment: 'jsdom',
    setupFiles: './src/setupTests.js',
    css: true,
  },
});
