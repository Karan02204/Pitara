import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), tailwindcss()],
  server: {
    proxy: {
      // Dev only: forward /api requests to the Express backend.
      // In production /api is served by Vercel on the same origin, so the
      // frontend always calls a relative /api URL (see src/config/api.js).
      "/api": "http://localhost:5000",
    },
  },
});
