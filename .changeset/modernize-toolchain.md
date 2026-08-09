---
'progress-str': minor
---

Publish ESM alongside CommonJS, and move the repo to `cyberuni`.

The package now carries an `exports` map: `import` resolves to a per-module ESM build
under `esm/`, `require` to a bundled CommonJS build under `cjs/`. Previously it shipped
only the per-module CommonJS tree in `dist/`.

`dist/` is gone. It was never a documented entry point — `main` and `typings` both
pointed inside it — and the CommonJS build can no longer be per-module: `string-length`
has been ESM-only since v5, so leaving it external makes `require('progress-str')`
depend on Node's `require(esm)` support, which only arrived in 22.12. This package
supports Node 20, so that dependency is now bundled into the CJS output instead.

`repository`, `homepage` and `bugs` point at `cyberuni/progress-str`. `repository` is
read when generating provenance, so the move has to land in the published metadata
rather than relying on GitHub's redirect.
