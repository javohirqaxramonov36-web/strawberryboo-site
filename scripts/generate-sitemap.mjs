import { readdir, readFile, writeFile } from 'node:fs/promises';
import { join, relative, sep } from 'node:path';

const origin = 'https://javohirqaxramonov36-web.github.io/strawberryboo-site';
const pagesRoot = join(process.cwd(), 'src', 'pages');
const blogRoot = join(process.cwd(), 'src', 'content', 'blog');
const ignored = new Set(['404.astro']);
const isDynamicRoute = (file) => /\[[^\]]+\]/.test(file);
async function walk(dir) {
  const entries = await readdir(dir, { withFileTypes: true });
  const nested = await Promise.all(entries.map(async (entry) => {
    const full = join(dir, entry.name);
    return entry.isDirectory() ? walk(full) : [full];
  }));
  return nested.flat();
}
const files = (await walk(pagesRoot)).filter((file) => file.endsWith('.astro') && !ignored.has(file.split(sep).at(-1)) && !isDynamicRoute(file));
const pageUrls = files.map((file) => {
  let path = relative(pagesRoot, file).replace(/\\/g, '/').replace(/\.astro$/, '');
  path = path.replace(/\/index$/, '');
  return `${origin}/${path}`.replace(/(?<!:)\/+/g, '/').replace(origin + '/', origin + '/');
});

// Blog posts are generated from dynamic Astro routes, so add only published
// Markdown entries to the sitemap rather than emitting the route template.
const blogFiles = (await walk(blogRoot)).filter((file) => file.endsWith('.md'));
const blogUrls = (await Promise.all(blogFiles.map(async (file) => {
  const source = await readFile(file, 'utf8');
  const match = source.match(/^---[\s\S]*?\bdraft:\s*(true|false)[\s\S]*?---/);
  if (match?.[1] === 'true') return null;
  const relativePath = relative(blogRoot, file).replace(/\\/g, '/').replace(/\.md$/, '');
  const [locale, ...slugParts] = relativePath.split('/');
  if (!['uz', 'ru', 'en'].includes(locale) || slugParts.length === 0) return null;
  const prefix = locale === 'uz' ? 'blog' : `${locale}/blog`;
  return `${origin}/${prefix}/${slugParts.join('/')}`;
}))).filter(Boolean);
const urls = [...new Set([...pageUrls, ...blogUrls])].sort();
const xml = ['<?xml version="1.0" encoding="UTF-8"?>', '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">', ...urls.map((url) => `  <url><loc>${url}</loc></url>`), '</urlset>', ''].join('\n');
await writeFile(join(process.cwd(), 'public', 'sitemap.xml'), xml);
console.log(`Generated sitemap with ${urls.length} URLs.`);
