const fs = require("fs-extra");

const outputDir = "./dist";

const toCopy = [
    "fonts",
    "img",
    "js",
    "styles",
    "index.html"
];

toCopy.forEach(x => fs.copySync(`./${x}`, `${outputDir}/${x}`));

fs.copySync("./index.html", `${outputDir}/404.html`);