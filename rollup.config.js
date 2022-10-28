import nodeResolve from "@rollup/plugin-node-resolve";
import wasm from "@rollup/plugin-wasm";
import json from "@rollup/plugin-json";
import commonjs from "@rollup/plugin-commonjs";
import typescript from "@rollup/plugin-typescript";
/**
 * @type {import("rollup").RollupOptions}
 */
export default {
  input: "src/index.ts",
  output: {
    dir: "build",
    format: "esm",
  },
  treeshake: {
    preset: "smallest",
  },
  plugins: [
    commonjs(),
    nodeResolve({ browser: false, preferBuiltins: false }),
    wasm({
      //   sync: false,
      targetEnv: "browser",
    }),
    json({}),
    typescript(),
  ],
};
