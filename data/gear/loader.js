// Vite-friendly dynamic import of all JSON files in this folder
const files = import.meta.glob('./*.json', { eager: true, import: 'default' });

const slugify = (s) =>
  s.toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/(^-|-$)/g, '');

const titleFromSlug = (slug) =>
  slug
    .split('-')
    .map(w => w.charAt(0).toUpperCase() + w.slice(1))
    .join(' ')
    .replace(/\bMh\b/, 'MH');

function normalizeEntry(path, data) {
  const slug = path.replace('./', '').replace('.json', ''); // e.g. "soft-plastic-worm"
  const title = data?.title ?? titleFromSlug(slug);
  const icon = data?.icon ?? iconFallback(slug);

  return {
    slug,
    title,
    icon,
    summary: data?.summary ?? '',
    sections: Array.isArray(data?.sections) ? data.sections : [],
    // pass through any other fields you keep in JSON
    ...data,
  };
}

function iconFallback(slug) {
  if (slug.includes('frog')) return '🐸';
  if (slug.includes('worm')) return '🪱';
  if (slug.includes('spinner')) return '🌀';
  if (slug.includes('chatter') || slug.includes('bladed')) return '⚡';
  if (slug.includes('jig')) return '🧲';
  if (slug.includes('braid')) return '🧵';
  if (slug.includes('fluoro')) return '🌫️';
  if (slug.includes('mono')) return '🧶';
  if (slug.includes('rod')) return '🎣';
  if (slug.includes('reel')) return '♻️';
  return '🔧';
}

const ALL = Object.entries(files).map(([path, data]) => normalizeEntry(path, data));

// simple helpers
export function listGear() {
  // sort by title, tweak if you prefer slug order
  return [...ALL].sort((a, b) => a.title.localeCompare(b.title));
}

export function getGear(slug) {
  return ALL.find((g) => g.slug === slug);
}
