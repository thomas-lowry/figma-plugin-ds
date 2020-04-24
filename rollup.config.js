import resolve from '@rollup/plugin-node-resolve';
import commonjs from '@rollup/plugin-commonjs';
import prettier from 'rollup-plugin-prettier';
import postcss from 'rollup-plugin-postcss';
import autoprefixer from 'autoprefixer';
import inlineSVG from 'postcss-inline-svg';
import { terser } from 'rollup-plugin-terser';

const production = !process.env.ROLLUP_WATCH;

export default {
	input: './src/figma-plugin-ds.js',
	output: {
		file: 'public/figma-plugin-ds.js',
		format: 'cjs',
		name: 'figma-plugin-ds'
	},
	plugins: [
		resolve(),
		commonjs(),
		prettier({
			"parser":"babel","printWidth":100,"tabWidth":4,"useTabs":true,"semi":true,"singleQuote":true,"trailingComma":"none","bracketSpacing":true,"jsxBracketSameLine":true,"arrowParens":"always"
		}),
		postcss({
			extract: true,
			minimize: production && true, // minify, only on build for prod
			plugins: [
				autoprefixer(),
				inlineSVG()
			]
		}),
		production && terser()
	]
};
