import { defaultContentRepository } from "@/content/adapters/default";
import { referenceContentRepository } from "@/content/adapters/reference";
import { siteSettingsSchema, workSchema } from "@/content/schemas";

async function testRepo(name: string, repo: typeof referenceContentRepository) {
  const site = await repo.getSite();
  siteSettingsSchema.parse(site);
  const works = await repo.getWorks();
  works.forEach((w) => workSchema.parse(w));
  if (works.length !== 8) throw new Error(`${name}: expected 8 works`);
  console.log(`PASS: ${name} (artist=${site.artistName})`);
}

async function main() {
  await testRepo("reference", referenceContentRepository);
  await testRepo("default", defaultContentRepository);
  console.log("PASS: content contract");
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
