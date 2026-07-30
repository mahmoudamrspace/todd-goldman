import { defaultContentRepository } from "@/content/adapters/default";
import { referenceContentRepository } from "@/content/adapters/reference";
import { siteSettingsSchema, workSchema } from "@/content/schemas";

async function testRepo(
  name: string,
  repo: typeof referenceContentRepository,
  options?: { minWorks?: number },
) {
  const site = siteSettingsSchema.parse(await repo.getSite());
  const works = (await repo.getWorks()).map((w) => workSchema.parse(w));
  const minWorks = options?.minWorks ?? 1;
  if (works.length < minWorks) {
    throw new Error(`${name}: expected at least ${minWorks} works, got ${works.length}`);
  }
  console.log(`PASS: ${name} (artist=${site.artistName}, works=${works.length})`);
}

async function main() {
  await testRepo("reference", referenceContentRepository, { minWorks: 8 });
  await testRepo("default", defaultContentRepository, { minWorks: 8 });
  console.log("PASS: content contract");
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
