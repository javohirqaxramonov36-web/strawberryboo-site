import { defineConfig } from 'astro/config';

// https://astro.build/config
export default defineConfig({
  site: 'https://javohirqaxramonov36-web.github.io/strawberryboo-site/',
  base: '/strawberryboo-site/',
  // UTF-8 charset (encoding xatolarini oldini olish uchun)
  markdown: {
    shikiConfig: { theme: 'github-dark' },
  },
  // Astro'ning rasmiy i18n tizimi (docs.astro.build/en/guides/internationalization).
  // Subpath routing tanlandi (/ru/, /en/) — SEO uchun eng yaxshi: har til alohida,
  // indekslanadigan URLga ega bo'ladi va hreflang orqali bog'lanadi.
  // prefixDefaultLocale: false — asosiy til (uz) ildizda qoladi, /ru/ va /en/ prefiks bilan.
  i18n: {
    defaultLocale: 'uz',
    locales: ['uz', 'ru', 'en'],
    routing: { prefixDefaultLocale: false },
  },
});
