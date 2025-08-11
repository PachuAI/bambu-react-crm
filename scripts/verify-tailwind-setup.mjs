import fs from "node:fs";

const postcss = fs.readFileSync("./postcss.config.js", "utf8");
if (!postcss.includes("@tailwindcss/postcss")) {
  console.error("❌ postcss.config.js: falta '@tailwindcss/postcss'.");
  process.exit(1);
}

const cssEntry = fs.readFileSync("./src/index.css", "utf8");
if (!cssEntry.includes('@import "tailwindcss"') &&
    !cssEntry.includes("@tailwind base")) {
  console.error("❌ src/index.css: falta importar Tailwind (v4: @import \"tailwindcss\").");
  process.exit(1);
}

const tw = fs.readFileSync("./tailwind.config.js", "utf8");
if (!tw.includes("./index.html") || !tw.includes("./src/**/*")) {
  console.error("❌ tailwind.config.js: revisá content=[\"./index.html\",\"./src/**/*.{ts,tsx,js,jsx}\"]");
  process.exit(1);
}
console.log("✅ Tailwind v4 verificado.");