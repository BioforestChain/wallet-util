// @ts-check
import commonjs from '@rollup/plugin-commonjs';
import nodeResolve from '@rollup/plugin-node-resolve';
import copy from 'rollup-plugin-copy';
import del from 'rollup-plugin-delete';
// import wasm from '@rollup/plugin-wasm';
// import json from '@rollup/plugin-json';
// import typescript from '@rollup/plugin-typescript';
import terser from '@rollup/plugin-terser';
import inject from '@rollup/plugin-inject';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const isDev = process.argv.includes('--dev');
/**
 * @return {import("rollup").Plugin[]}
 */
const genPlugins = ({ outdir }) => {
  return [
    commonjs(),
    nodeResolve({ browser: false, preferBuiltins: false }),
    // wasm({
    //   targetEnv: 'browser',
    // }),
    copy({
      targets: [{ src: 'assets/**/*.wasm', dest: `${outdir}/assets` }],
      flatten: false,
    }),
    del({ targets: outdir }),
    inject({
      Buffer: [path.resolve(__dirname, './dist/lib/buffer.mjs'), 'Buffer'],
    }),
    isDev ? { name: 'terser-disabled' } : terser({ ecma: 2020 }),
  ]; //.filter(Boolean);
};

/**
 * @type {import("rollup").OutputOptions}
 */
const outputConfig = {
  sourcemap: isDev,
  entryFileNames: '[name].mjs',
  chunkFileNames: (chunkInfo) => {
    const filepath = chunkInfo.moduleIds.at(-1) || '';
    const dirpath = path.dirname(filepath);
    if (path.basename(dirpath) === 'wordlists') {
      return 'wordlists/[name].mjs';
    }

    // console.log('chunkInfo', chunkInfo);
    return '[name]-[hash].mjs';
  },
  format: 'esm',
};
/**
 * @type {import("rollup").RollupOptions[]}
 */
export default [
  {
    input: 'dist/index.mjs',
    output: {
      dir: 'build/web',
      ...outputConfig,
    },
    treeshake: {
      preset: 'smallest',
    },
    plugins: genPlugins({ outdir: 'build/web' }),
  },
  {
    input: 'dist/node.mjs',
    output: {
      dir: 'build/node',
      ...outputConfig,
    },
    treeshake: {
      preset: 'smallest',
    },
    plugins: genPlugins({ outdir: 'build/node' }),
  },
];
