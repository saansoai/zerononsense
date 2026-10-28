import react from '@vitejs/plugin-react'
import { defineConfig } from 'vite'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],

  /* Asset URLs are absolute from the domain root by default. A deploy under a
     subpath (a preview path, a GitHub Pages project site) needs them rewritten,
     so the prefix is an environment variable rather than a code change:
     BASE_PATH=/preview/ npm run build */
  base: process.env.BASE_PATH ?? '/',
})
