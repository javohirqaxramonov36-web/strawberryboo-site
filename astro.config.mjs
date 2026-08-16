import { defineConfig } from 'astro/config';

// https://astro.build/config
export default defineConfig({
  site: 'https://javohirqaxramonov36-web.github.io/strawberryboo-site/',
  base: '/strawberryboo-site/',
  // UTF-8 charset (encoding xatolarini oldini olish uchun)
  markdown: {
    shikiConfig: { theme: 'github-dark' },
  },
});
