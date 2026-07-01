import { svelte, vitePreprocess } from '@sveltejs/vite-plugin-svelte';
import { defineConfig } from 'vitest/config';

export default defineConfig({
  plugins: [
    svelte({
      configFile: false,
      preprocess: [vitePreprocess()],
    }),
  ],
  test: {
    include: ['src/lib/tests/**/*.test.ts'],
    setupFiles: ['src/lib/tests/setup.ts'],
  },
});
