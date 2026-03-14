import { readdirSync, readFileSync, writeFileSync } from "node:fs";
import { join, parse } from "node:path";
import { getRandomValues } from "node:crypto";

const { dirname: __dirname } = import.meta;

const README_PATH = join(__dirname, "README.md");
const content = readFileSync(README_PATH, "utf8");

const images = readdirSync(join(__dirname, "images"));
const index = getRandomValues(new Uint8Array(1))[0] % images.length;
const { base, name } = parse(images[index]);

const updated = content
	.replace(/!\[[^\]\]]+\]\(\.\/images\/[^\(\)]+\)/, `![${name}](./images/${base})`)
	.replace(/(Updated at).+/, `$1 ${new Date().toUTCString()}_`);

writeFileSync(README_PATH, updated);
