import Page, { PageList } from "../Page";

const items = [
    {
        title: "A blog",
        link: '#blog',
        description: `A blog description...`
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
    link: x.link
}));

export default function Extra() {
    return (
        <Page width="normal">
            <PageList items={itemsJSX}/>
        </Page>
    );
}