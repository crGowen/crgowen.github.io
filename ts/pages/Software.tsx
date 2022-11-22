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
        title: "Chess (Work in Progress)",
        description: `WIP and not yet available!`
    },

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
    link: x.link
}));

export default function Software() {
    return (
        <Page width="normal">
            <PageList items={itemsJSX}/>
        </Page>
    );
}