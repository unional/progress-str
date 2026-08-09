import { defineConfig } from 'vitest/config'

export default defineConfig({
	test: {
		// `test` and `expect` stay global, as they were under jest, so the specs
		// need no per-file imports.
		globals: true,
		environment: 'node',
		include: ['ts/**/*.spec.ts'],
		coverage: {
			provider: 'v8',
			include: ['ts/**/*.ts'],
			// asserts.ts is a spec helper, not shipped code — index.ts never reaches it,
			// so counting it would report coverage on the test suite itself.
			exclude: ['ts/**/*.spec.ts', 'ts/asserts.ts'],
			reporter: ['text', 'lcov'],
			// Pinned to what the suite already achieves, so a drop fails the build
			// instead of quietly showing up in a coverage report nobody reads.
			//
			// branches is 99 rather than 100 for exactly one gap: the `i === length`
			// side of renderBar.ts's `if (i !== length)`. createBarArray normalizes
			// every value to at most 1 before scaling, so the inner while stops at
			// i === length - 1 and that branch cannot be taken. It is dead defensive
			// code, not an untested path — deleting it is a behaviour change to a
			// published library and belongs in its own PR.
			thresholds: {
				branches: 99,
				functions: 100,
				lines: 100,
				statements: 100
			}
		}
	}
})
