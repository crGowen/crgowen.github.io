const server = require("../scripts/server.js");
const process = require("process");

module.exports = () => {
    const useGithubPagesSite = process.env.USE_GH_PAGES_SITE;
    console.log(typeof useGithubPagesSite);

    let app = null;
    let url = "https://crgowen.github.io";

    if (!useGithubPagesSite) {
        app = server("dist");
        const port = app.address().port;
        url = `http://localhost:${port}`;
    };

    console.log("USING: ");
    console.log(url);
    console.log(useGithubPagesSite == true);

    return [app, url];
}