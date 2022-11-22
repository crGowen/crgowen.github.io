import Page, { PageList } from "../Page";
import candle from '../../img/renders/candle.png';
import knf from '../../img/renders/knf.png';
import saphsword from '../../img/renders/saphsword.png';

const items = [
    {
        title: "Sapphire Longsword",
        image: saphsword
    },
    {
        title: "Candle",
        image: candle
    },
    {
        title: "Decorative Cutlery",
        image: knf
    }
];

const itemsJSX = items.map( x => ({
    jsx: (<>
    <img src={x.image}/>
    <h1 style={{
            fontWeight: "normal",
            fontSize: '1.1rem',
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