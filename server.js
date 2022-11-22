const path = require("path");
const express = require('express');
const process = require("process");

const arg = process.argv.slice(2)[0];
const cleanedArg = arg ? "/" + arg : "";

const msg = cleanedArg.length ? `Server starting for directory: .${cleanedArg}` : "Server starting for normal directory";
console.log(msg);

const app = express();

const PORT = 3000;

// Server for testing during development

app.use(express.static(`.${cleanedArg}`));

app.get('*', (req, res) => {
   const file = path.resolve(__dirname, `.${cleanedArg}/404.html`);
   res.sendFile(file);
});

app.listen(PORT)