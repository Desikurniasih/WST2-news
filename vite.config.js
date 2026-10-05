import react from '@vitejs/plugin-react'
import { defineConfig } from 'vite'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      // Semua request ke /api/news/* akan diteruskan ke newsapi.org/v2/*
      // Ini menghindari masalah CORS karena browser hanya bicara ke localhost
      '/api/news': {
        target: 'https://newsapi.org/v2',
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/api\/news/, ''),
      },
    },
  },
})

