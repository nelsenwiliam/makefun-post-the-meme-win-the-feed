// Post the Meme, Win the Feed — entry program.
// Job: take POST.json from the bot folder and place an identical copy
// in the output folder. No network, no clock, same bytes every run.

import { mkdirSync, readFileSync, writeFileSync } from "node:fs";
import { join } from "node:path";

const botDir = process.env.MAKEFUN_BOT_DIR ?? "/bot";
const outDir = process.env.MAKEFUN_OUTPUT_DIR ?? "/output";

const sourcePath = join(botDir, "POST.json");
const targetPath = join(outDir, "POST.json");

let raw: Buffer;
try {
  raw = readFileSync(sourcePath);
} catch (err) {
  console.error(`cannot read ${sourcePath}: ${(err as Error).message}`);
  process.exit(1);
}

let parsed: unknown;
try {
  parsed = JSON.parse(raw.toString("utf8"));
} catch (err) {
  console.error(`POST.json is not valid JSON: ${(err as Error).message}`);
  process.exit(1);
}

if (
  typeof parsed !== "object" ||
  parsed === null ||
  Array.isArray(parsed) ||
  typeof (parsed as { url?: unknown }).url !== "string" ||
  ((parsed as { url: string }).url.length === 0)
) {
  console.error("POST.json must be a JSON object with a non-empty string field 'url'");
  process.exit(1);
}

const postUrl = (parsed as { url: string }).url;
const xPostShape = /^https:\/\/(x\.com|twitter\.com)\/[A-Za-z0-9_]+\/status\/[0-9]+$/;
if (!xPostShape.test(postUrl)) {
  console.error(`url is not an X post address (https://x.com/<handle>/status/<digits>): ${postUrl}`);
  process.exit(1);
}

mkdirSync(outDir, { recursive: true });
writeFileSync(targetPath, raw);

const writtenBack = readFileSync(targetPath);
if (!writtenBack.equals(raw)) {
  console.error(`verify failed: ${targetPath} differs from ${sourcePath}`);
  process.exit(1);
}
console.log(`copied POST.json to ${targetPath}`);
