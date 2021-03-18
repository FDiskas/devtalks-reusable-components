import commonjs from '@rollup/plugin-commonjs';
import typescript from 'rollup-plugin-typescript2';
import postcss from 'rollup-plugin-postcss';
import copy from 'rollup-plugin-copy';
import image from '@rollup/plugin-image';
import resolve from 'rollup-plugin-node-resolve';
import peerDepsExternal from 'rollup-plugin-peer-deps-external';

let override = { compilerOptions: { jsx: 'react', declaration: true, module: 'ESNext', declarationDir: 'src/components/typings' } };

export default {
  input: './index.ts',
  output: [
    {
      dir: 'build',
      format: 'cjs',
      sourcemap: false,
      exports: 'named',
    },
    {
      dir: 'build/esm',
      format: 'esm',
      sourcemap: false,
      exports: 'named',
    },
  ],
  preserveModules: true,
  external: ['react', 'react-dom'],
  plugins: [
    peerDepsExternal(),
    resolve({ browser: true }),
    commonjs({
      include: /node_modules/,
      exclude: ['node_modules/process-es6/**'],
      requireReturnsDefault: 'preferred',
      esmExternals: true,
    }),
    image(),
    typescript({
      tsconfig: "../../tsconfig.json",
      useTsconfigDeclarationDir: true,
      tsconfigOverride: override,
    }),
    postcss({
      modules: true,
      inject: false,
      extract: true,
      config: { path: 'src/components/postcss.config.js' },
    }),
    copy({
      targets: [
        {
          src: 'typings/components',
          dest: 'build/typings',
        },
      ],
    }),
  ],
};
