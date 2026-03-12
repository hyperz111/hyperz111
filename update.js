import { readFileSync, writeFileSync } from "node:fs";
import { join } from "node:path";

const README_PATH = join(import.meta.dirname, "README.md");
const content = readFileSync(README_PATH, "utf8");
const updated = content.replace(/(Updated at).+/, `$1 ${new Date().toGMTString()}_`);
writeFileSync(README_PATH, updated);
