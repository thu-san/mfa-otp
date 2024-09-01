import { polyfillNode } from 'esbuild-plugin-polyfill-node';
import { umdWrapper } from 'esbuild-plugin-umd-wrapper';
import { defineConfig } from 'tsup';

const umdFormat = 'umd' as 'cjs';

export default defineConfig({
  entry: ['src/index.ts'],
  clean: true,
  dts: true,
  minify: true,
  sourcemap: true,
  target: 'es2015',
  esbuildPlugins: [
    polyfillNode({
      polyfills: {
        crypto: true,
      },
    }),
    umdWrapper({
      libraryName: 'mfaOTP',
    }),
  ],
  format: ['cjs', 'esm', umdFormat],
  outExtension: ({ format }) => {
    if (format === 'esm') return { js: '.mjs' };
    if (format === (umdFormat as string)) return { js: '.umd.js' };
    return { js: '.js' };
  },
});
