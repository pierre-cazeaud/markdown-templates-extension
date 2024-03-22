import { defineConfig } from 'wxt';
import { svelte, vitePreprocess } from '@sveltejs/vite-plugin-svelte';
import { readFile, writeFile } from 'fs';

// See https://wxt.dev/api/config.html
export default defineConfig({
  srcDir: 'src',
  hooks: {
    'build:manifestGenerated': (wxt, manifest) => {
      // Modify manifest and allow options page to open in a new tab
      manifest.options_ui.open_in_tab = true;
    },
  },
  manifestVersion: 3,
  vite: () => ({
    plugins: [
      svelte({
        // Using a svelte.config.js file causes a segmentation fault when importing the file
        configFile: false,
        preprocess: [vitePreprocess()],
      }),
    ],
  }),
});
