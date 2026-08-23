import { readdir, writeFile } from 'node:fs/promises';
import { join, relative, sep } from 'node:path';

const origin = 'https://javohirqaxramonov36-web.github.io/strawberryboo-site';
const pagesRoot = join(process.cwd(), 'src', 'pages');
const ignored = new Set(['404.astro']);
async function walk(dir) {
  const entries = await readdir(dir, { withFileTypes: true });
  const nested = await Promise.all(entries.map(async (entry) => {
    const full = join(dir, entry.name);
    return entry.isDirectory() ? walk(full) : [full];
  }));
  return nested.flat();
}
const files = (await walk(pagesRoot)).filter((file) => file.endsWith('.astro') && !ignored.has(file.split(sep).at(-1)));
const urls = [...new Set(files.map((file) => {
  let path = relative(pagesRoot, file).replace(/\\/g, '/').replace(/\.astro$/, '');
  path = path.replace(/\/index$/, '');
  return `${origin}/${path}`.replace(/(?<!:)\/+/g, '/').replace(origin + '/', origin + '/');
}))].sort();
const xml = ['<?xml version="1.0" encoding="UTF-8"?>', '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">', ...urls.map((url) => `  <url><loc>${url}</loc></url>`), '</urlset>', ''].join('\n');
await writeFile(join(process.cwd(), 'public', 'sitemap.xml'), xml);
console.log(`Generated sitemap with ${urls.length} URLs.`);
