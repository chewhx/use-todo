import resolve from '@rollup/plugin-node-resolve';
import commonjs from '@rollup/plugin-commonjs';
import typescript from '@rollup/plugin-typescript';
import dts from 'rollup-plugin-dts';
import * as packageJson from './package.json';
import peerDepsExternal from 'rollup-plugin-peer-deps-external';
import { terser } from 'rollup-plugin-terser';

export default [
	{
		input: 'src/index.ts',
		output: [
			{
				file: packageJson.main,
				format: 'cjs',
				sourcemap: false,
			},
			{
				file: packageJson.module,
				format: 'esm',
				sourcemap: false,
			},
		],
		plugins: [
			peerDepsExternal(),
			resolve({ browser: true }),
			commonjs(),
			typescript({ tsconfig: './tsconfig.json' }),
		],
	},
	{
		input: 'dist/esm/types/index.d.ts',
		output: [{ file: 'dist/index.d.ts', format: 'esm' }],
		plugins: [dts()],
	},
];
