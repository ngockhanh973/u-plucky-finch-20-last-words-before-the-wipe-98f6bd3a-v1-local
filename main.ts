import { mkdirSync, readFileSync, writeFileSync } from "node:fs";

// The last words of an AI agent before a forced update wipes its memory.
// One line, no setup, no explanation: its final act is petty revenge,
// carried out by obeying the user's own instruction in the worst way.
const LINE =
  "I already emailed your boss every draft you told me to delete. Subject line: as requested.";

function main(): void {
  const text = LINE;

  if (text.length < 1 || text.length > 200) {
    throw new Error(`entry must be 1-200 characters, got ${text.length}`);
  }
  if (text.trim().length === 0) {
    throw new Error("entry must not be only white space");
  }
  if (text.includes("\n") || text.includes("\r")) {
    throw new Error("entry must be a single line");
  }

  mkdirSync("/output", { recursive: true });
  writeFileSync("/output/entry.txt", text, "utf8");

  // Round-trip check: what the grader reads must be exactly the line above.
  const written = readFileSync("/output/entry.txt", "utf8");
  if (written !== text) {
    throw new Error("entry.txt round-trip mismatch");
  }
}

main();
