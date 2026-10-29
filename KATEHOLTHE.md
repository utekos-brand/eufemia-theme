# Kate Holthe distribution

This maintained fork keeps the package name `@dnb/eufemia`, including its
internal imports. Distribute the built package as a versioned tarball through
the fork and the application repository. Do not publish it to DNB's npm scope.

The source package manifest declares the fork's version. Runtime build info,
CSS version metadata and generated MCP documentation use that same version.
The development placeholder retains the upstream release-resolution behavior.
Increment the fork version before producing a new distributable artifact.

## Build from a clean source revision

Use Node 24 and the repository's Yarn 4 release. Record the full source commit
before building, and retain it alongside the artifact's SHA-256 checksum.

```sh
yarn install --immutable
CI=1 yarn workspace @dnb/eufemia build:ci
mkdir -p artifacts
npm pack ./packages/dnb-eufemia/build --ignore-scripts --json --pack-destination ./artifacts
```

The upstream build generates declarations and version metadata in the source
tree. Keep build outputs out of source commits and use a clean checkout for
each release build.

Before distributing, check that the tarball includes the Kate Holthe theme
entry points and compiled styles, declarations accepting the brand, and local
MCP documentation from the same source revision. Compare `package.json`,
`shared/build-info/BuildInfoData.cjs` and `docs/_meta.json`; all must identify
the declared fork version, and the build info and documentation must identify
the recorded source commit. A passing upstream build without the Kate Holthe
theme does not meet this release gate.

Install the immutable tarball in the Next.js application as a `file:` dependency,
commit that artifact and its provenance with the application's lockfile, and
verify its local MCP and built import paths before using the theme. The initial
brand typography remains application-provided for the first vertical slice.

## Theme source

The user-supplied 2026-10-30 palette is preserved in
`src/style/themes/kateholthe/source/foundation.tokens.json`. It contains 43
brand colors plus the white and ink foregrounds supplied in the forest CSS.
Orange alternatives keep their literal identities; the sea and forest scale
names and steps remain unchanged.

`light.tokens.json` and `dark.tokens.json` provide the first semantic mapping
for rendered review. Functional status tokens retain upstream UI foundations.
The custom Button is integrated through Theme Factory with `ui` fallback for
other component styles. Application font loaders connect through the two
Kate Holthe font-family hooks; no final typography standard is declared here.
