import { useEffect, useState } from 'react';

export type HashRoutes = {
    defaultPage: () => JSX.Element;
    [key:string]:  () => JSX.Element;
}

export default function useHashRouting(routes: HashRoutes) {
    const resourceMatch = window.location.pathname.match(/\/?(\w+)\.?/) ?? ['software', 'software'];
    const hashMatch = window.location.hash.match(/#?(.+)/);
    const matched = (hashMatch ?? resourceMatch)[1].toLowerCase();
    
    const [hash, setHash] = useState(matched);

    useEffect(function addHashListener() {
        const handleHashChange = () => setHash(window.location.hash.substring(1));
        addEventListener("hashchange", handleHashChange);

        return function cleanupHashListener() {
            removeEventListener("hashchange", handleHashChange);
        };

    }, [setHash]);

    return routes[hash] ?? routes.defaultPage;
}