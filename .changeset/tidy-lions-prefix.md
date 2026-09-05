---
'progress-str': patch
---

Use the `node:` protocol for Node builtin imports.

`ts/asserts.ts` and two spec files imported `assert` without the prefix. The
prefix is what distinguishes a Node builtin from a same-named package on the
registry, so an unprefixed specifier resolves to whichever the resolver reaches
first — and `assert` is a real package on npm.

Behaviour is unchanged: `engines.node` is `>= 20` and `node:` specifiers have
worked in both `import` and `require` since Node 16. `files` includes `ts`, so
the published source changes, hence the patch.

Surfaced by raising `useNodejsImportProtocol` from `info` to `error` in
`@repobuddy/biome`, where it had been reporting and exiting 0.
