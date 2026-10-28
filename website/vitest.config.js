import react from '@vitejs/plugin-react';
import { defineConfig } from 'vitest/config';

/* Kept out of vite.config.js so the production build never loads the test
   plugin graph. */
export default defineConfig({
  plugins: [react()],
  test: {
    environment: 'jsdom',
    globals: true,
    setupFiles: ['./vitest.setup.js'],
    include: ['src/**/*.test.{js,jsx}'],
    restoreMocks: true,
  },
});
