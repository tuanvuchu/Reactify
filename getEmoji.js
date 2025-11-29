import fs from "fs";

const path = "node_modules/emoji-datasource-apple/emoji.json";
const data = JSON.parse(fs.readFileSync(path, "utf8"));
const filtered = data.map((item) => ({
  name: item.name,
  unified: item.unified,
  category: item.category,
}));
fs.writeFileSync(
  "public/emoji.json",
  JSON.stringify(filtered, null, 2),
  "utf8",
);

const src = "node_modules/emoji-datasource-apple/img/apple/64";
const dest = "public/64";

if (fs.existsSync(dest)) {
  fs.rmSync(dest, { recursive: true, force: true });
}
fs.cpSync(src, dest, { recursive: true });
