import pagesData from './pages.json';

export type Block = {
  type: string;
  html?: string;
  headings?: string[];
  images?: { src: string; alt: string }[];
  buttons?: { text: string; href: string }[];
  items?: any[];
  links?: { href: string; text: string }[];
  slides?: { titleHtml: string; html: string; image: string }[];
  posts?: { title: string; href: string; excerpt: string }[];
};

export type Page = {
  path: string;
  kind: string;
  h1: string;
  title: string;
  description: string;
  ogImage: string;
  date: string;
  categoryTitle: string;
  blocks: Block[];
};

export const pages = pagesData as Page[];
export const pageByPath = (path: string) => pages.find((p) => p.path === path);

export const contact = {
  company: 'Stern Gerüstbau & Verleih',
  phone: '0157 5782 4911',
  phoneHref: 'tel:+4915757824911',
  email: 'info@geruestbau-stern.de',
  street: 'Solmser Gewerbepark 19',
  zip: '35606',
  city: 'Solms',
  mapsUrl: 'https://maps.app.goo.gl/c7kcnzJJJTxcK21F8',
  googleRating: 4.9,
};

// Main navigation – same structure as the original site
export const nav = [
  { label: 'Startseite', href: '/' },
  {
    label: 'Portfolio',
    href: '/portfolio/',
    children: [
      { label: 'Dachdeckergerüst', href: '/dachdeckergeruest/' },
      { label: 'Fassadengerüst', href: '/fassadengeruest/' },
      { label: 'Industriegerüst', href: '/industriegeruest/' },
      { label: 'Malergerüst', href: '/malergeruest/' },
      { label: 'Malerarbeiten', href: '/maler/' },
      { label: 'Dachdeckerarbeiten', href: '/dachdecker/' },
    ],
  },
  {
    label: 'Ratgeber',
    children: [
      { label: 'Gerüste', href: '/gerueste-ratgeber/' },
      { label: 'Dachdeckerarbeiten', href: '/dachdecker-ratgeber/' },
    ],
  },
  {
    label: 'Blog',
    children: [
      { label: 'Gerüstbau in urbanen Gebieten', href: '/geruestbau-in-urbanen-gebieten-herausforderungen-und-loesungen/' },
      { label: 'Kostenoptimierung im Gerüstverleih', href: '/kostenoptimierung-im-geruestverleih-tipps-fuer-bauunternehmen/' },
      { label: 'Technologische Innovationen im Gerüstbau', href: '/technologische-innovationen-im-geruestbau-die-zukunft-des-geruestverleihs/' },
      { label: 'Nachhaltigkeit im Gerüstbau', href: '/nachhaltigkeit-im-geruestbau-umweltfreundliche-materialien-und-praktiken/' },
      { label: 'Sicherheitsstandards im Gerüstbau', href: '/sicherheitsstandards-im-geruestbau-2024/' },
    ],
  },
  { label: 'Kontakt', href: '/kontakt/' },
  { label: 'Impressum', href: '/impressum/' },
];

const cityName = (slug: string) =>
  slug
    .split('-')
    .map((w) => w.charAt(0).toUpperCase() + w.slice(1))
    .join(' ')
    .replace('Giessen', 'Gießen');

// On the original site the Gießen roofer page has the address /dachdecker-friedrichsdorf-2/
const cityOverrides: Record<string, string> = { '/dachdecker-friedrichsdorf-2/': 'Gießen' };

/** All location pages of a service, e.g. 'geruestbau' → [{ name, href }] */
export const locations = (service: 'geruestbau' | 'maler' | 'dachdecker') =>
  pages
    .filter((p) => p.kind === `ort-${service}`)
    .map((p) => ({ name: cityOverrides[p.path] ?? cityName(p.path.slice(service.length + 2, -1)), href: p.path }))
    .sort((a, b) => a.name.localeCompare(b.name, 'de'));

export const serviceOfKind: Record<string, { label: string; href: string; service: 'geruestbau' | 'maler' | 'dachdecker' }> = {
  'ort-geruestbau': { label: 'Gerüstbau', href: '/', service: 'geruestbau' },
  'ort-maler': { label: 'Malerarbeiten', href: '/maler/', service: 'maler' },
  'ort-dachdecker': { label: 'Dachdeckerarbeiten', href: '/dachdecker/', service: 'dachdecker' },
};

/** Which category (and therefore Ratgeber) a blog post belongs to */
export const categoryOfPost = (path: string) => {
  for (const c of pages.filter((p) => p.kind === 'category')) {
    if (c.blocks[0]?.posts?.some((post) => post.href === path)) return c;
  }
  return undefined;
};

export const projectPhotos = [
  '/media/2023-01-28.webp',
  '/media/2023-01-13.webp',
  '/media/2023-01-27.webp',
  '/media/2023-01-11.webp',
  '/media/2023-01-12.webp',
  '/media/2023-01-26.webp',
  '/media/2023-01-6.webp',
];

/** Stable photo choice per page, so each page gets its own hero image */
export const photoFor = (path: string) => {
  let h = 0;
  for (const ch of path) h = (h * 31 + ch.charCodeAt(0)) >>> 0;
  return projectPhotos[h % projectPhotos.length];
};
