// @ts-check
import { defineConfig } from 'astro/config';

// On GitHub Actions the site is built as a preview for GitHub Pages
// (served from a subfolder, hidden from search engines).
const isPagesPreview = process.env.GITHUB_ACTIONS === 'true';

export default defineConfig(
  isPagesPreview
    ? { site: 'https://almaron-host.github.io', base: '/stern-geruestbau' }
    : { site: 'https://geruestbau-stern.de' },
);
