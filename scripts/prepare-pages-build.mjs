import { copyFile, writeFile } from "node:fs/promises";

await copyFile("dist/client/index.html", "dist/client/404.html");
await writeFile("dist/client/.nojekyll", "", "utf8");

console.log("Prepared GitHub Pages build with SPA fallback.");
