const server = require("../scripts/server.js");
const process = require("process");

module.exports = () => {
    /*
        When local or on-push triggered test, useGithubPagesSite will be false
        but for the automatic daily test, it is true.

        The automatic daily will test the site as hosted on Github Pages, rather than building and localhosting

    */
    const useGithubPagesSite = process.env.USE_GH_PAGES_SITE === "true";

    let app, url;

    if (useGithubPagesSite) {
        app = null;
        url = "https://crgowen.github.io";
    } else {
        app = server("dist");
        const port = app.address().port;
        url = `http://localhost:${port}`;
    };

    return [app, url];
}