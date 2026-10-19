import { defineConfig } from 'astro/config';
import react from '@astrojs/react';

// GitHub Pages: https://neteumbra.github.io/cv-web
export default defineConfig({
  site: 'https://neteumbra.github.io',
  base: '/cv-web',
  integrations: [react()],
  vite: {
    optimizeDeps: { include: ['@react-pdf/renderer'] },
  },
});
