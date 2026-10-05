import { defineConfig } from 'astro/config';

export default defineConfig({
  site: 'https://saltyblondebakery.com',
  trailingSlash: 'always',
  image: {
    responsiveStyles: true,
  },
});
