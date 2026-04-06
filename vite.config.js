import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { VitePWA } from 'vite-plugin-pwa'

// https://vite.dev/config/
export default defineConfig(({ command }) => ({
  plugins: [
    react(),
    VitePWA({
      registerType: 'autoUpdate',
      includeAssets: ['favicon_io/apple-touch-icon.png', 'favicon_io/favicon.ico', 'loading-indicator.png', 'video.mp4'],
      manifest: {
        name: 'duyxyz',
        short_name: 'duyxyz',
        description: 'Sentinel Secure Gateway',
        theme_color: '#1e1e2e',
        icons: [
          {
            src: 'favicon_io/android-chrome-192x192.png',
            sizes: '192x192',
            type: 'image/png'
          },
          {
            src: 'favicon_io/android-chrome-512x512.png',
            sizes: '512x512',
            type: 'image/png'
          },
          {
            src: 'favicon_io/android-chrome-512x512.png',
            sizes: '512x512',
            type: 'image/png',
            purpose: 'any maskable'
          }
        ]
      },
      workbox: {
        globPatterns: ['**/*.{js,css,html,ico,png,svg,json,md,webp,mp4}'],
        maximumFileSizeToCacheInBytes: 15 * 1024 * 1024, // Tăng giới hạn lên 15MB
        runtimeCaching: [
          {
            urlPattern: ({ request }) => request.destination === 'video',
            handler: 'CacheFirst',
            options: {
              cacheName: 'videos-cache',
              expiration: {
                maxEntries: 5,
                maxAgeSeconds: 60 * 60 * 24 * 30, // 30 Days
              },
              cacheableResponse: {
                statuses: [0, 200],
              },
              rangeRequests: true,
            },
          },
        ],
      }
    })
  ],
  base: '/',
}))

