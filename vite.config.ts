import { defineConfig } from 'vite';
import solidPlugin from 'vite-plugin-solid';
import suidPlugin from '@suid/vite-plugin';
import { VitePWA } from 'vite-plugin-pwa'

export const BASE_URL = "/web-share-play/"

export default defineConfig({
  plugins: [
    solidPlugin(),
    suidPlugin(),
    VitePWA({
      injectRegister: 'auto',
      strategies: "generateSW",
      manifest: {
        name: "SharePlay",
        short_name: "SharePlay",
        description: "Share media P2P serverlessly",
        theme_color: "#1976d2",
        icons: [
          {
            src: "./maskable_icon_x192.png",
            sizes: "192x192",
            type: "image/png",
            purpose: "any maskable"
          },
          {
            src: "./maskable_icon_x512.png",
            sizes: "512x512",
            type: "image/png",
            purpose: "any maskable"
          }
        ]
      },
      devOptions: {
        enabled: true
      }
    })
  ],
  server: {
    port: 3000,
  },
  base: BASE_URL,
  build: {
    target: 'es6',
  },
});