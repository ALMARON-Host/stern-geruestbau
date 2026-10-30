// Prefix root-relative links with the deploy base (e.g. /stern-geruestbau on GitHub Pages).
const base = import.meta.env.BASE_URL.replace(/\/$/, '');

export const url = (path: string) => (path.startsWith('/') && !path.startsWith('//') ? base + path : path);

export const withBase = (html = '') =>
  base ? html.replace(/(href|src)="\/(?!\/)/g, `$1="${base}/`) : html;

/** Strip heading tags to plain text, e.g. for meta or alt text */
export const textOf = (html = '') => html.replace(/<[^>]+>/g, '').replace(/&amp;/g, '&').replace(/\s+/g, ' ').trim();

/** Filenames like "leistung1_gerustaufbau_verleih" are not useful alt texts */
export const goodAlt = (alt: string, fallback: string) =>
  alt && /\s/.test(alt) && !/[_]/.test(alt) ? alt : fallback;
