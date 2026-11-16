import { readFileSync, writeFileSync, statSync } from "node:fs";
import { createHash } from "node:crypto";
import { dirname, join, resolve } from "node:path";
import { fileURLToPath } from "node:url";

// Resolve the directory that holds this script and entry.png.
const here = dirname(fileURLToPath(import.meta.url));
const sourcePath = join(here, "entry.png");
const outputPath = process.argv[2]
  ? resolve(process.argv[2])
  : join(here, "out.png");

function sha256Hex(bytes: Buffer): string {
  return createHash("sha256").update(bytes).digest("hex");
}

// Read the graded entry image exactly once, then mirror it verbatim.
const sourceBytes = readFileSync(sourcePath);
writeFileSync(outputPath, sourceBytes);

const outputBytes = readFileSync(outputPath);
const sourceHash = sha256Hex(sourceBytes);
const outputHash = sha256Hex(outputBytes);
const identical = sourceHash === outputHash;

console.log(`output: ${outputPath}`);
console.log(`bytes: ${outputBytes.length}`);
console.log(`sha256 output: ${outputHash}`);
console.log(`sha256 source: ${sourceHash}`);
console.log(`match: ${identical}`);
