import fs from "node:fs";
import path from "node:path";

const root = path.resolve("src");
const cssImports = [];
function walk(p) {
  for (const f of fs.readdirSync(p)) {
    const full = path.join(p, f);
    const stat = fs.statSync(full);
    if (stat.isDirectory()) walk(full);
    else if (/\.(ts|tsx|js|jsx)$/.test(f)) {
      const txt = fs.readFileSync(full, "utf8");
      const re = /import\s+['"](.+\.css)['"]/g;
      let m;
      while ((m = re.exec(txt))) cssImports.push({ file: full, import: m[1] });
    }
  }
}
walk(root);

const allowed = new Set(["./index.css", "/src/index.css", "src/index.css"]);
const offenders = cssImports.filter(i => ![...allowed].some(a => i.import.endsWith(a)));

if (offenders.length) {
  console.error("❌ Solo se permite importar CSS desde src/index.css. Revisá:");
  offenders.forEach(o => console.error(` - ${o.file} -> ${o.import}`));
  process.exit(1);
}
if (fs.existsSync(path.resolve("src/App.css"))) {
  console.error("❌ Existe src/App.css del template. Eliminá el archivo.");
  process.exit(1);
}
console.log("✅ Uso de CSS correcto (sin fugas).");