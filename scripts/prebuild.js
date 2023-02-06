const fs = require("fs-extra");

fs.removeSync("./dist");
fs.removeSync("./js");
fs.removeSync("./unbundled");