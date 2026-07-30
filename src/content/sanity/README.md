# Sanity CMS

Wire the Sanity adapter in `src/content/sanity/adapter.ts` when ready.

Set environment variables:

```
SANITY_PROJECT_ID=your-project-id
SANITY_DATASET=production
```

`getContentRepository()` in `src/content/index.ts` automatically selects the Sanity adapter when both vars are set.

Use `parseSanitySite()` and `parseSanityWork()` to validate documents through existing Zod schemas.
