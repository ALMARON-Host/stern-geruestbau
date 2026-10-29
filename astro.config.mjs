// @ts-check
import { defineConfig } from 'astro/config';

// PAGES_PREVIEW=true builds the preview for GitHub Pages
// (served from a subfolder, hidden from search engines). See deploy.ps1.
const isPagesPreview = process.env.PAGES_PREVIEW === 'true';

export default defineConfig(
  isPagesPreview
    ? { site: 'https://almaron-host.github.io', base: '/stern-geruestbau' }
    : { site: 'https://geruestbau-stern.de' },
);
