const server = require("./server.js");
const { execSync } = require("node:child_process");

const app = server("dist");

try {
    const res = execSync("npm run playwright-tests");
    console.log(res)
    res.output.forEach(x => console.log(x && x.toString()));
} catch (res) {
    res.output.forEach(x => console.log(x && x.toString()));
}

app.close(() => console.log("Closed server"));