const path = require("path");
const express = require('express');
const app = express();

const PORT = 3000;

// Server for testing during development

app.use(express.static("."));

app.get('*', (req, res) => {
   console.log("404!");
   const file = path.resolve(__dirname, "/index.html");
   res.sendFile(file);
});

app.listen(PORT)