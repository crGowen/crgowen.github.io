import { useEffect, useState } from 'react';

export type HashRoutes = {
    defaultPage: () => JSX.Element;
    [key:string]:  () => JSX.Element;
}

export default function useHashRouting(routes: HashRoutes) {
    /*
        The following 3 lines only matter when the website is first loaded. If there is a #hash in the URL,
        we use that to determine the initial page to load,
        but if not, then if there is a /resource, we can use that.
        If neither are specified, we go to the index page (software)

        E.g.:
            <addr>#abc and <addr>/abc   - are considered the same (but will return 404 because page 'abc' doesn't exist)
            <addr>/abc#def              - because the hash takes priority over resource, this will result in looking for page 'def' (will return 404 page again)
            <addr>                      - will go to the index (Software) page
            <addr>/renders              - will go the Renders page
            <addr>#blog                 - will go the Blog page
            <addr>/software#blog        - will also go to the blog page
            <addr>/                     - is considered the same as just "<addr>"
            <addr>#                     - is considered the same as just "<addr>"


    */
    const emptyMatch = 'software';
    const resourceMatch = window.location.pathname.match(/\/?(\w+)\.?/) ?? [emptyMatch, emptyMatch];
    const hashMatch = window.location.hash.match(/#?(.+)/);
    const initialMatch = (hashMatch ?? resourceMatch)[1].toLowerCase();

    // After the website has loaded its initial page (determined by the above), we now use the listener combined with state to route between pages using hashes
    const [match, setMatch] = useState(initialMatch);

    // when clicking buttons on page that change the hash (i.e. navigation btns), this listener is triggered
    useEffect(function addHashListener() {
        const handleHashChange = () => setMatch(window.location.hash.substring(1) || emptyMatch);
        addEventListener("hashchange", handleHashChange);

        return function cleanupHashListener() {
            removeEventListener("hashchange", handleHashChange);
        };

    }, [setMatch]);

    // if the the hashroutes contains the [match] key, the corresponding page will be returned, otherwise default (404)
    return routes[match] ?? routes.defaultPage;
}