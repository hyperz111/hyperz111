import { readdirSync, readFileSync, writeFileSync } from "node:fs";
import { join, parse } from "node:path";
import { getRandomValues } from "node:crypto";

const { dirname: __dirname } = import.meta;

const README_PATH = join(__dirname, "README.md");
const content = readFileSync(README_PATH, "utf8");

const images = readdirSync(join(__dirname, "images"));
const updated = content
	.replace(/!\[[^\]\]]+\]\(\.\/images\/([^\(\)]+)\)/, (_, g1) => {
		const index = getRandomValues(new Uint8Array(1))[0] % images.length;
		const next = images[index];
		const { name } = parse(next);
		return `![${name}](./images/${next})`;
	})
	.replace(/(Updated at).+/, `$1 ${new Date().toUTCString()}_`);

writeFileSync(README_PATH, updated);
