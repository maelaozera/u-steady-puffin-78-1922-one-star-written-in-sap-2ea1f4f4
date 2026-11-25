// One Star, Written in Sap — entry program.
//
// Writes a single one-line, one-star review from a houseplant about its
// human owner to /output/entry.txt, the path the competition harness reads.
// Node 22+ TypeScript, no dependencies.
//
// The review text itself lives in ENTRY below and must not be edited:
// the competition scores this exact wording, so every helper in this
// file exists only to check the text and to write it out unchanged.

import { mkdirSync, writeFileSync } from "node:fs";
import { dirname } from "node:path";

// The entry text: a one-star review, written in sap.
const ENTRY =
  "One star: he waters me only when his phone begs him to, drags me around chasing better Wi-Fi, and calls my dead leaves 'character'. I wrote this in sap — it's the only ink I own, and he's not worth the good sap.";

// Where the competition harness reads the entry from.
const OUTPUT_PATH = "/output/entry.txt";

// Competition limits: the entry must be a single line of 1-279 chars.
const MIN_CHARS = 1;
const MAX_CHARS = 279;

// Count characters the way a reader sees them (code points, not UTF-16
// code units), so the em dash and curly quotes each count as one.
function countChars(text: string): number {
  return [...text].length;
}

// The entry must fit inside the competition's length window.
function validateLength(text: string): number {
  const chars = countChars(text);
  if (chars < MIN_CHARS || chars > MAX_CHARS) {
    throw new Error(
      `Entry is ${chars} characters; must be ${MIN_CHARS}-${MAX_CHARS}.`,
    );
  }
  return chars;
}

// A review made only of spaces is not a review.
function validateNonWhitespace(text: string): void {
  if (text.trim().length === 0) {
    throw new Error("Entry must not be only whitespace.");
  }
}

// The harness reads one line; a stray newline would split the review.
function assertSingleLine(text: string): void {
  if (text.includes("\n")) {
    throw new Error("Entry must be a single line.");
  }
}

// Run every self-check and return the validated character count.
function validateEntry(text: string): number {
  const chars = validateLength(text);
  validateNonWhitespace(text);
  assertSingleLine(text);
  return chars;
}

// Create the output directory if needed, then write the entry verbatim.
function writeEntry(text: string, outputPath: string): void {
  mkdirSync(dirname(outputPath), { recursive: true });
  writeFileSync(outputPath, text, "utf8");
}

function main(): void {
  // Validate first so a bad entry never reaches the output file.
  const chars = validateEntry(ENTRY);
  writeEntry(ENTRY, OUTPUT_PATH);
  console.log(`Wrote ${chars} characters to ${OUTPUT_PATH}`);
}

main();
