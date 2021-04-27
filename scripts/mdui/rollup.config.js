import { terser } from 'rollup-plugin-terser';
import { nodeResolve } from '@rollup/plugin-node-resolve';
import { visualizer } from 'rollup-plugin-visualizer';
import alias from '@rollup/plugin-alias';
import copy from 'rollup-plugin-copy';
import pkg from '../../packages/mdui/package.json';

const banner = `
/*!
 * mdui ${pkg.version} (${pkg.homepage})
 * Copyright 2016-${new Date().getFullYear()} ${pkg.author}
 * Licensed under ${pkg.license}
 */
`.trim();

// eslint-disable-next-line import/no-default-export
export default [
  {
    input: './packages/mdui/index.js',
    plugins: [nodeResolve(), visualizer()],
    output: [
      {
        banner,
        format: 'es',
        sourcemap: false,
        file: './packages/mdui/mdui.js',
      },
      {
        banner,
        format: 'es',
        sourcemap: true,
        file: './packages/mdui/mdui.min.js',
        plugins: [
          terser({
            format: {
              comments: /zdhxiong/,
            },
          }),
        ],
      },
    ],
  },
];
