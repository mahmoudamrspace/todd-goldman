import { defaultContentRepository } from "@/content/adapters/default";
import { siteSettingsSchema, workSchema } from "@/content/schemas";

async function main() {
  const site = siteSettingsSchema.parse(await defaultContentRepository.getSite());
  const works = (await defaultContentRepository.getWorks()).map((w) =>
    workSchema.parse(w),
  );
  if (works.length < 8) {
    throw new Error(`Expected at least 8 works, got ${works.length}`);
  }
  console.log(`PASS: todd (artist=${site.artistName}, works=${works.length})`);
  console.log("PASS: content contract");
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
