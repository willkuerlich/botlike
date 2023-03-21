/// <reference types="vitest" />

// Configure Vitest (https://vitest.dev/config/)

// import { defineConfig } from 'vite';
import { defineConfig } from 'vitest/config';

// plugins
import tsconfigPaths from 'vite-tsconfig-paths';

export default defineConfig({
  // root: 'src',
  // build: {
  //   emptyOutDir: true,
  //   outDir: './dist',
  // },
  plugins: [tsconfigPaths()],
  test: {
    // include: ['src/**/*.{js,mjs,cjs,ts,mts,cts,jsx,tsx}'],
    // exclude: ['src/processArgs.ts'],
    /* for example, use global to avoid globals imports (describe, test, expect): */
    // globals: true,
  },
});
