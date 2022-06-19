const path = require("path");
const express = require('express');
const app = express();

const PORT = 3000;

// Server for testing during development

app.use(express.static("."));

app.get('*', (req, res) => {
   const file = path.resolve(__dirname, "./404.html");
   res.sendFile(file);
});

app.listen(PORT)