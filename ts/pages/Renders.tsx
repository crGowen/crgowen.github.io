import Page, { PageList } from "../Page";
import candle from '../../img/candle.png';

const items = [
    {
        title: "img1",
        image: candle
    },
    {
        title: "img2",
        image: undefined
    },
    {
        title: "img3",
        image: undefined
    },
    {
        title: "img4",
        image: undefined
    }
];

const itemsJSX = items.map( x => ({
    jsx: (<>
    <img src={x.image}/>
    <h1 style={{
            fontWeight: "normal",
            fontSize: '1.2rem',
            marginBottom: '0.2rem'
        }}
    >{x.title}</h1>
    </>),
}));

export default function Renders() {
    return (
        <Page width="normal">
            <PageList items={itemsJSX}/>
        </Page>
    );
}