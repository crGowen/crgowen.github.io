const server = require("../scripts/server.js");
const process = require("process");

module.exports = () => {
    const useGithubPagesSite = process.env.USE_GH_PAGES_SITE;
    console.log("USE GH PAGES = ");
    console.log(useGithubPagesSite);
    console.log(useGithubPagesSite === true);

    let app = null;
    let url = "https://crgowen.github.io";

    if (!useGithubPagesSite) {
        app = server("dist");
        const port = app.address().port;
        url = `http://localhost:${port}`;
    };

    return [app, url];
}