const fs = require("fs-extra");

const outputDir = "./dist";

const toCopy = [
    "dl", 
    "fonts",
    "img",
    "js",
    "styles",
    "404.html",
    "index.html"
];

toCopy.forEach(x => fs.copySync(`./${x}`, `${outputDir}/${x}`));