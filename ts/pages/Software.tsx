import Page, { PageList } from "../Page";

const items = [
    {
        title: "Stenor",
        link: '#stenor',
        description: `Short for "Steganographer", Stenor is a hobby project on digital steganography,
            imitating the cyber-spy thriller cliché of secretly storing data inside of data.
            The tool takes an input file, and as a second input an image file, and encodes the input file into the image without changing it in any noticable way.
            The hidden data can then be decoded and extracted by Stenor.`
    },
    {
        title: "Conway's Game of Life",
        link: "#gol",
        description: `Online version of John Horton Conway's Game of Life, a cellular automaton game where
            the player enters an initial state which then evolves itself over time, often creating mathematically beautiful patterns.`
    },
    {
        title: "Interactive Periodic Table",
        link: `#ipt`,
        description: `Periodic table that deals more with the history of chemistry and its elements than the chemistry itself.
            Click on elements to get a short brief summary of how we discovered it, how the element behaves, and what we use it for.`
        
    },
    {
        title: "C++ Library: Implementation of Djikstra's Algorithm",
        link: "https://github.com/crGowen/djikstras-algorithm",
        description: `Generalised library for using Djikstra's Algorithm on node graphs.
        Provides functionality for building a graph and finding the shortest route between two nodes:- add nodes, connect them, then run
        Djikstra's Algorithm on the network. Usage example provided.`,
        openInNewTab: true
    },
    {
        title: "C Library: Genetic Algorithm",
        link: "https://github.com/crGowen/genetic-algorithm",
        description: `Generalised library for solving complicated optimisation problems via genetic algorithm. Provides functionality
        for declaring a solution fitness evaluation and then (with user specified parameters)
        running a genetic algorithm to optimise a solution population for the fitness function. Usage example provided.`,
        openInNewTab: true
    }
];

const itemsJSX = items.map( x => ({
    jsx: (<>
    <h1 style={{
            fontWeight: "normal",
            fontSize: '1.4rem',
            marginBottom: '0.2rem'
        }}>{x.title}</h1>
    <p style={{
            fontWeight: "normal",
            fontSize: '0.9rem'
        }}>{x.description}</p>
    </>),
    link: x.link,
    openInNewTab: x.openInNewTab
}));

export default function Software() {
    return (
        <Page width="normal">
            <PageList items={itemsJSX}/>
        </Page>
    );
}