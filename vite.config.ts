import { defineConfig } from 'vite';
import solidPlugin from 'vite-plugin-solid';
import suidPlugin from '@suid/vite-plugin';

export const BASE_URL = "/web-share-play/"

export default defineConfig({
  plugins: [solidPlugin(), suidPlugin()],
  server: {
    port: 3000,
  },
  base: BASE_URL,
  build: {
    target: 'es6',
  },
});