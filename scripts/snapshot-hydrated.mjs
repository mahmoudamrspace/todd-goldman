#!/usr/bin/env node
/**
 * Snapshot hydrated DOM from reference export at desktop/tablet/phone viewports.
 */
import { spawn } from "node:child_process";
import { mkdirSync, rmSync, writeFileSync } from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { setTimeout as sleep } from "node:timers/promises";

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const refDir = path.join(root, "reference", "picco-export");
const outDir = path.join(root, "web", "src", "framer", "data");
const tmpServe = "/tmp/picco-ref-hydrated-serve";
const port = 3458;

const viewports = [
  ["desktop", 1440, 900],
  ["tablet", 810, 1024],
  ["phone", 390, 844],
];

function run(cmd, args) {
  return new Promise((resolve, reject) => {
    const child = spawn(cmd, args, { stdio: ["ignore", "pipe", "pipe"] });
    let stderr = "";
    child.stderr.on("data", (d) => (stderr += d));
    child.on("exit", (code) => {
      if (code === 0) resolve();
      else reject(new Error(`${cmd} ${args.join(" ")}\n${stderr}`));
    });
  });
}

async function waitFor(url, attempts = 60) {
  for (let i = 0; i < attempts; i++) {
    try {
      const res = await fetch(url);
      if (res.ok) return;
    } catch {}
    await sleep(250);
  }
  throw new Error(`Server not ready: ${url}`);
}

async function main() {
  mkdirSync(outDir, { recursive: true });
  rmSync(tmpServe, { recursive: true, force: true });
  await run("rsync", [
    "-a",
    "--exclude",
    ".DS_Store",
    `${refDir}/`,
    `${tmpServe}/`,
  ]);

  const server = spawn(
    "npx",
    ["--yes", "serve", tmpServe, "-l", `tcp://127.0.0.1:${port}`],
    { cwd: "/tmp", stdio: ["ignore", "pipe", "pipe"] },
  );

  const shutdown = () => {
    try {
      server.kill("SIGTERM");
    } catch {}
  };
  process.on("exit", shutdown);

  try {
    await waitFor(`http://127.0.0.1:${port}/`);

    const { createRequire } = await import("node:module");
    const require = createRequire(path.join(root, "web", "package.json"));
    const { chromium } = require("playwright");
    const browser = await chromium.launch({ headless: true });

    for (const [name, width, height] of viewports) {
      const page = await browser.newPage({
        viewport: { width, height },
        reducedMotion: "no-preference",
      });
      await page.goto(`http://127.0.0.1:${port}/`, {
        waitUntil: "networkidle",
        timeout: 90000,
      });
      await page.waitForTimeout(2500);

      const html = await page.evaluate(() => document.documentElement.outerHTML);
      const meta = await page.evaluate(() => {
        const header = document.querySelector('[data-framer-name="Header"]');
        const intro = document.getElementById("text_intro");
        return {
          scrollHeight: document.body.scrollHeight,
          headerHtml: header ? header.outerHTML.slice(0, 200) : null,
          introTop: intro
            ? Math.round(intro.getBoundingClientRect().top + window.scrollY)
            : null,
          mainClass: document.getElementById("main")?.className || "",
          wrapperClass:
            document.querySelector("#main > div")?.className?.toString() || "",
        };
      });

      writeFileSync(path.join(outDir, `hydrated-${name}.html`), html);
      writeFileSync(
        path.join(outDir, `hydrated-${name}.meta.json`),
        JSON.stringify(meta, null, 2) + "\n",
      );
      console.log(
        `snapshot ${name}: scrollHeight=${meta.scrollHeight} introTop=${meta.introTop}`,
      );
      await page.close();
    }

    // Work detail template snapshot (desktop)
    {
      const page = await browser.newPage({ viewport: { width: 1440, height: 900 } });
      await page.goto(`http://127.0.0.1:${port}/works/oxbridge-press/`, {
        waitUntil: "networkidle",
        timeout: 90000,
      });
      await page.waitForTimeout(2500);
      const html = await page.evaluate(() => document.documentElement.outerHTML);
      writeFileSync(path.join(outDir, "hydrated-work-oxbridge.html"), html);
      console.log("snapshot work-oxbridge: OK");
      await page.close();
    }

    await browser.close();
    console.log("snapshot-hydrated: OK");
  } finally {
    shutdown();
  }
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
