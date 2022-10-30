import nodeResolve from '@rollup/plugin-node-resolve';
import wasm from '@rollup/plugin-wasm';
import json from '@rollup/plugin-json';
import commonjs from '@rollup/plugin-commonjs';
import typescript from '@rollup/plugin-typescript';
import terser from '@rollup/plugin-terser';
/**
 * @type {import("rollup").RollupOptions}
 */
export default {
  input: 'dist/index.mjs',
  output: {
    dir: 'build',
    format: 'esm',
  },
  treeshake: {
    preset: 'smallest',
  },
  plugins: [
    commonjs(),
    nodeResolve({ browser: false, preferBuiltins: false }),
    wasm({
      //   sync: false,
      targetEnv: 'browser',
    }),
    json({}),
    terser({ ecma: 2020 }),
  ],
};
