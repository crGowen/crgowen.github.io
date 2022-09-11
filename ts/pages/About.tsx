import Page, { PageList } from "../Page";

const items = [
    {
        title: `About me`,
        description: `I am a developer from the United Kingdom and I'm interested in aviation, motorsport,
        and aerospace. I primarily develop in C++ and JS (with TypeScript and React)`
    },
    {
        title: `About this website`,
        description: `This site is intended to be a place to dump and display a variety of my personal projects,
        ranging from software and programming, to 3D renders, and occasionally even a blog or tutorial post.
        Mostly I just take whatever projects I'm happy with and throw them up on here.`
    },
    {
        title: `Credits`,
        description: `All projects on this page are created by me (C R Gowen), hosted via GitHub, and some projects are created with the help of third party softwares/utilties
        (which are credited on their relevant page or in the included readme/about files).`
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
    </>)
}));

export default function About() {
    return (
        <Page width="normal">
            <PageList items={itemsJSX}/>
        </Page>
    );
}