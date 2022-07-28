import Page, { PageList } from "../Page";

const items = [
    {
        title: "An Item", description: "aaaaaaaaaaaaa",
        link: 'item1'
    },
    {
        title: "Non-Link Item", description: "aaeeeaaaaaa aaeeeaaaaaa aaeeeaaaaaa aaeeeaaaaaaaaeeeaaaaaa aaeeeaaaaaa aaeeeaaaaaa aaeeeaaaaaa aaeeeaaaaaa aaeeeaaaaaa aaeeeaaaaaa aaeeeaaaaaa" +
        "aaeeeaaaaaa aaeeeaaaaaa aaeeeaaaaaa aaeeeaaaaaa  aaeeeaaaaaa aaeeeaaaaaa aaeeeaaaaaa aaeeeaaaaaa aaeeeaaaaaa aaeeeaaaaaa aaeeeaaaaaa aaeeeaaaaaa aaeeeaaaaaa aaeeeaaaaaa aaeeeaaaaaa aaeeeaaaaaa" +
        "aaeeeaaaaaa aaeeeaaaaaa aaeeeaaaaaa  aaeeeaaaaaa aaeeeaaaaaa aaeeeaaaaaa aaeeeaaaaaa aaeeeaaaaaa aaeeeaaaaaa aaeeeaaaaaa aaeeeaaaaaa aaeeeaaaaaa aaeeeaaaaaa aaeeeaaaaaa aaeeeaaaaaa aaeeeaaaaaa" + 
        "aaeeeaaaaaa aaeeeaaaaaa  aaeeeaaaaaa aaeeeaaaaaa aaeeeaaaaaa aaeeeaaaaaa aaeeeaaaaaa aaeeeaaaaaa aaeeeaaaaaa aaeeeaaaaaa aaeeeaaaaaa aaeeeaaaaaa aaeeeaaaaaa aaeeeaaaaaa aaeeeaaaaaa" + 
        "aaeeeaaaaaa aaeeeaaaaaa  aaeeeaaaaaa aaeeeaaaaaa"
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