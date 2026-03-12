import { readdirSync, readFileSync, writeFileSync } from "node:fs";
import { join, parse } from "node:path";

const { dirname: __dirname } = import.meta;

const README_PATH = join(__dirname, "README.md");
const content = readFileSync(README_PATH, "utf8");

const images = readdirSync(join(__dirname, "images"));
const updated = content
	.replace(/!\[[^\]\]]+\]\(\.\/images\/([^\(\)]+)\)/, (_, g1) => {
		const nextIndex = (images.indexOf(g1) % images.length) + 1;
		const next = images[nextIndex];
		const { name } = parse(next);
		return `![${name}](./images/${next})`;
	})
	.replace(/(Updated at).+/, `$1 ${new Date().toUTCString()}_`);

writeFileSync(README_PATH, updated);
