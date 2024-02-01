import { defineConfig } from 'vite'
import { resolve } from 'path'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  base: '',
  build: {
    rollupOptions: {
      input: [
        'pages/create-item/index.html',
        'pages/main/index.html',
        'pages/options/index.html'
      ]
    },
  },
})
