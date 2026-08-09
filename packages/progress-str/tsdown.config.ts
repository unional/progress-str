import { writeFile } from 'node:fs/promises'
import { defineConfig } from 'tsdown'

const entry = ['ts/index.ts']

// Two outputs replacing the single `tsc -p` pass that emitted per-module CommonJS
// into dist/:
//   esm/ — the ESM build plus the .d.ts that `types` points at
//   cjs/ — the CommonJS build, marked commonjs by its own package.json
//
// dist/ — the per-module CommonJS tree 3.4.4 published — is deliberately not
// recreated, because the CJS build can no longer be per-module. string-length has been
// ESM-only since v5, so a CommonJS output that leaves it external only resolves it
// through Node's require(esm) support, which landed in 22.12. This package declares
// `engines.node: ">= 20"`, so on the low end of its own supported range that path
// throws ERR_REQUIRE_ESM. Bundling string-length into the CJS output removes the
// dependency on that escape hatch — and bundling is what rules out `unbundle: true`
// here, which is why only the ESM build keeps the per-module shape.
export default defineConfig([
	{
		entry,
		format: 'esm',
		outDir: 'esm',
		outExtensions: () => ({ js: '.js', dts: '.d.ts' }),
		dts: true,
		sourcemap: true,
		// Mirror the source tree rather than bundling, so the ESM output keeps the
		// per-module shape tsc used to emit and stays tree-shakeable downstream.
		unbundle: true
	},
	{
		entry,
		format: 'cjs',
		outDir: 'cjs',
		outExtensions: () => ({ js: '.js', dts: '.d.ts' }),
		dts: true,
		sourcemap: true,
		// The ESM-only dependencies have to be inlined; leaving them external is what
		// made the previously published CommonJS output unloadable. The rest stay
		// external so consumers keep deduping them.
		deps: { alwaysBundle: ['string-length'] },
		hooks: {
			// The package root is `"type": "module"`, so cjs/index.js is only read as
			// CommonJS because of this marker. tsdown's `copy` treats `to` as a
			// directory, which is why this is written rather than copied.
			'build:done': () => writeFile('cjs/package.json', '{ "type": "commonjs" }\n')
		}
	}
])
