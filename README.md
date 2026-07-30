# Todd Goldman Portfolio

Standalone Next.js portfolio for Todd Goldman, built on a Framer-derived layout layer with Todd-specific editorial motion and content.

## Architecture

```
src/app/          Routes only
src/widgets/      Page sections + shells
src/features/     Interactive behaviors (nav, FAQ, marquee, motion)
src/entities/     Reusable cards and items
src/content/      Repository, schemas, Todd seeds
src/shared/       UI primitives and config
framer/           Extracted layout CSS + appear animation data
public/assets/    Fonts and placeholder artwork
```

## Commands

```bash
corepack enable
pnpm install
pnpm run dev               # http://localhost:3010
pnpm run build             # Static export → out/
pnpm run check             # lint + typecheck + contract + build
pnpm run preview:out       # Serve out/ on :3460
```

## Sanity CMS

Set `SANITY_PROJECT_ID` and `SANITY_DATASET` to swap adapters via `getContentRepository()` without touching components.
