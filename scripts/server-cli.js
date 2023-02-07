const process = require("process");

const server = require("./server.js");

const arg = process.argv.slice(2)[0];

server(arg, true);