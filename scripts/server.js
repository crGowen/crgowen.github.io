const path = require("path");
const express = require('express');

module.exports = function server(dir, logging = false, port = null){
      const cleanedArg = dir ? "/" + dir : "";

      const msg = cleanedArg.length ? `Server starting for directory: .${cleanedArg}` : "Server starting for normal directory";
      if (logging) console.log(msg);

      const app = express();

      // Server for testing during development
      const argCorrectedDir = `../.${cleanedArg}`;

      app.use(express.static(path.resolve(__dirname, argCorrectedDir)));

      app.get('*', (req, res) => {
         const file = path.resolve(__dirname, `${argCorrectedDir}/404.html`);
         res.sendFile(file);
      });

      const server = port ? app.listen(port) : app.listen();

      if (logging) console.log(`Listening on PORT ${server.address().port}`);

      return server;
   };