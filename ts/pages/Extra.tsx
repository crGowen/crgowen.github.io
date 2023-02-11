import Page, { PageList } from "../Page";

const items = [
    {
        title: "Tutorial: Memory Padding and Memory Addresses",
        link: '#memsaving',
        description: `Memory management is a lost art in a world where nearly everybody has 1GB more RAM than they'll ever need, when I went to university it was barely discussed besides the obvious 'don't use a large type if a smaller size will do the job', and while it might seem like that is the be all and end all, it's far from it.`
    },
    {
        title: "Tutorial: CPU Architecture and Variable Performance",
        link: '#architecture',
        description: `It is tempting to think of all variables as simply mathematical objects, insofar that we should just use the smallest-size appropriate variable for our task,
            but this would be incorrect. The architecture of hardware is a deep and interesting topic by itself,
            and it makes a significant difference to performance: I would argue in fact, that it should be one of the primary considerations for a programmer making a variable choice.`
    },
    {
        title: "C++ Library: Implementation of Djikstra's Algorithm",
        link: "https://github.com/crGowen/djikstras-algorithm",
        description: `Generalised library for using Djikstra's Algorithm on node graphs.
        Provides functionality for building a graph and finding the shortest route between two nodes:- add nodes, connect them, then run
        Djikstra's Algorithm on the network. Usage example provided with release.`,
        openInNewTab: true
    },
    {
        title: "C++ Library: Genetic Algorithm",
        link: "https://github.com/crGowen/genetic-algorithm",
        description: `Generalised library for solving complicated optimisation problems via genetic algorithm. Provides functionality
        for declaring a solution fitness evaluation and then (with user specified parameters)
        running a genetic algorithm to optimise a solution population for the fitness function. Usage example provided with release.`,
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

export default function Extra() {
    return (
        <Page width="normal">
            <PageList items={itemsJSX}/>
        </Page>
    );
}