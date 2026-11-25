// Entry for make.fun's "Post the Meme, Win the Feed" bounty (program/v1, Node 22,
// standard library only). The entry is the X post itself: an AI agent made the meme
// picture (meme.png, rendered procedurally by make-meme.mjs in this repository),
// it is posted on X from a public account with @_myronera and the entrant's play
// code in the post's text, and POST.json names that post.
//
// This program's only job is to copy POST.json from the repository root to
// /output/POST.json, where the house's gate reads it. It does no network, reads
// no clock, and writes the same bytes on every run. It first checks POST.json
// parses as JSON with a url string, so a broken file fails loudly instead of
// silently copying garbage.
//
// Local run (outside the grader's container):
//   mkdir -p out && MAKEFUN_BOT_DIR=. MAKEFUN_OUTPUT_DIR=out node main.ts

import { copyFileSync, mkdirSync, readFileSync } from 'node:fs';
import { join } from 'node:path';

const BOT_DIR = process.env.MAKEFUN_BOT_DIR ?? '/bot';
const OUTPUT_DIR = process.env.MAKEFUN_OUTPUT_DIR ?? '/output';

const src = join(BOT_DIR, 'POST.json');
const dst = join(OUTPUT_DIR, 'POST.json');

// Fail loudly if POST.json is not a JSON object with a url string.
const parsed: unknown = JSON.parse(readFileSync(src, 'utf8'));
if (typeof parsed !== 'object' || parsed === null || typeof (parsed as { url?: unknown }).url !== 'string') {
  console.error('POST.json must be a JSON object with a string "url" field');
  process.exit(1);
}

mkdirSync(OUTPUT_DIR, { recursive: true });
try {
  copyFileSync(src, dst);
} catch (err) {
  console.error(`POST.json could not be copied from ${BOT_DIR}: ${(err as Error).message}`);
  process.exit(1);
}
