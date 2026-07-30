# Todd Goldman Portfolio

Standalone Next.js portfolio rebuilt from the Picco Framer export with SOLID layering and pixel-verified design parity.

## Location

`/Users/mahmoudamr/development/todd-goldman`

The original migration workspace at `/Users/mahmoudamr/Downloads/test` is **not modified**.

## Architecture

```
src/app/          Routes only
src/widgets/      Page sections + shells
src/features/     Interactive behaviors (nav, FAQ, marquee, appear)
src/entities/     Reusable cards and items
src/content/      Repository, schemas, reference + default seeds
src/shared/       UI primitives and config
framer/           Verbatim extracted CSS + appear.json
reference/        Read-only Framer export (pixel gate baseline)
```

## Content profiles

| Profile | Env | Use |
|---------|-----|-----|
| `default` | (none) | Production — **Todd Goldman** branding |
| `reference` | `CONTENT_PROFILE=reference` | Pixel gate — matches Framer export text |

## Commands

```bash
corepack enable
pnpm install
pnpm run extract:framer    # Extract CSS/animations from reference/
pnpm run dev               # http://localhost:3010
pnpm run build             # Static export → out/
pnpm run check             # lint + typecheck + contract + build + verify
pnpm run gate              # Build + verify with reference profile
pnpm run preview:out       # Serve out/ on :3460
```

## Verification

- `pnpm run verify:route` — section pixel diffs at 1440 / 810 / 390
- `pnpm run verify:behavior` — marquee, nav, FAQ, sticky
- `pnpm run test:contract` — both content adapters satisfy schemas

## Sanity CMS

Set `SANITY_PROJECT_ID` and `SANITY_DATASET` to swap adapters via `getContentRepository()` without touching components.

## Artist

All production content uses **Todd Goldman** as the artist name. Reference profile retains export copy for verification only.
