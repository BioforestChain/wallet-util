import commonjs from '@rollup/plugin-commonjs';
import nodeResolve from '@rollup/plugin-node-resolve';
import copy from 'rollup-plugin-copy';
import del from 'rollup-plugin-delete';
// import wasm from '@rollup/plugin-wasm';
// import json from '@rollup/plugin-json';
// import typescript from '@rollup/plugin-typescript';
// import terser from '@rollup/plugin-terser';

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
  ];
};
/**
 * @type {import("rollup").RollupOptions[]}
 */
export default [
  {
    input: 'dist/index.mjs',
    output: {
      dir: 'build',
      entryFileNames: '[name].mjs',
      chunkFileNames: '[name]-[hash].mjs',
      format: 'esm',
    },
    treeshake: {
      preset: 'smallest',
    },
    plugins: genPlugins({ outdir: 'build' }),
  },
  {
    input: 'dist/node.mjs',
    output: {
      dir: 'build-node',
      entryFileNames: '[name].mjs',
      chunkFileNames: '[name]-[hash].mjs',
      format: 'esm',
    },
    treeshake: {
      preset: 'smallest',
    },
    plugins: genPlugins({ outdir: 'build-node' }),
  },
];
