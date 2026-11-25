// One Star, Written in Sap — entry program.
//
// Writes a single one-line, one-star review from a houseplant about its
// human owner to /output/entry.txt, the path the competition harness reads.
// Node 22+ TypeScript, no dependencies.

import { mkdirSync, writeFileSync } from "node:fs";
import { dirname } from "node:path";

const ENTRY =
  "One star: he waters me only when his phone begs him to, drags me around chasing better Wi-Fi, and calls my dead leaves 'character'. I wrote this in sap — it's the only ink I own, and he's not worth the good sap.";

const OUTPUT_PATH = "/output/entry.txt";
const MAX_CHARS = 279;

function main(): void {
  // Gate self-check: the entry must be 1-279 characters of
  // non-whitespace text, on a single line.
  const chars = [...ENTRY].length;
  if (chars < 1 || chars > MAX_CHARS) {
    throw new Error(`Entry is ${chars} characters; must be 1-${MAX_CHARS}.`);
  }
  if (ENTRY.trim().length === 0) {
    throw new Error("Entry must not be only whitespace.");
  }
  if (ENTRY.includes("\n")) {
    throw new Error("Entry must be a single line.");
  }

  mkdirSync(dirname(OUTPUT_PATH), { recursive: true });
  writeFileSync(OUTPUT_PATH, ENTRY, "utf8");
  console.log(`Wrote ${chars} characters to ${OUTPUT_PATH}`);
}

main();
