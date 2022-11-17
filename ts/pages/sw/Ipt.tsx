import Page, { PageEntry } from "../../Page";
import {elements, Elem, ElemInfo, Spacer, RowSubstitution} from "../../data/iptElems";
import { useState, useEffect } from "react";

const defaultSelection: ElemInfo = elements[0][0] as ElemInfo;

/*{
    name: "",
    symbol: "",
    mass: 0,
    z: 0,
    state: "Solid",
    p1: "",
    p2: "",
    p3: ""
};*/

export default function Ipt() {
    const [currentSelection, setCurrentSelection] = useState<ElemInfo>(defaultSelection);

    useEffect(() => {
        const clickHandler = (evt: MouseEvent) => {
            evt.stopPropagation();
            const id = (evt.target as HTMLElement).id;

            const prefix = "iptElement-";
            if (id.includes(prefix)) {
                const symbol = id.substring(prefix.length);
                const foundElem = findElementBySymbol(symbol);
                setCurrentSelection(foundElem);
            }
        };

        window.addEventListener("click", clickHandler);

        return () => window.removeEventListener("click", clickHandler);
    });

    return (
        <Page width="wide">
            <PageEntry>
                <div className="iptContainer">
                    <div className="iptLeftPane">
                        <Legend />
                        <Table/>
                    </div>
                    <InfoPane info={currentSelection} />
                </div>
            </PageEntry>
        </Page>
    );
}

function Period(props: {elems: Elem[]}){
    return <div className="iptRow">
        {props.elems.map((e, i) => <ElemEntry key={i} data={e} />)}
    </div>
}

function ElemEntry(props: {data: Elem}) {
    const { data } = props;

    const types = ["name", "spaces", "rowSub"];

    const resolved = types.find((key) => (data as any)[key] !== undefined); 
    switch(resolved) {
        case "name":
            return <ElemSq data={data as ElemInfo}/>;
        case "spaces":
            return <RowSpacer data={data as Spacer}/>;
        case "rowSub":
            return <RowSub data={data as RowSubstitution}/>;
        default:
            return null;
    }
}

function ElemSq(props: {data: ElemInfo}) {
    const state = props.data.state.toLowerCase();
    const radio = props.data.halfLife !== undefined ? "radio" : "";

    return <div className={`iptSq iptElem ${state} ${radio}`} id={`iptElement-${props.data.symbol}`}>{props.data.symbol}</div>;
}

function RowSpacer(props: {data: Spacer}) {
    const arr = [...new Array(props.data.spaces).keys()];

    return <>
        {arr.map(x => <div key={`iptSpacer +${x}`} className="iptSq"></div>)}
    </>
}

function RowSub(props: {data: RowSubstitution}) {
    return <div className="iptSq iptRowSub">{props.data.rowSub}</div>
}

function Table() {
    return <div className="iptTable">
        {elements.map((x, i) => <Period key={i} elems={x} />)}
    </div>;
}

function Legend(){
    return <div className="iptLegend">
        <div className="iptLegendHeader">LEGEND</div>
        <div className="iptLegendRow">
            <div className="iptLegendItem solid">Solid</div>
            <div className="iptLegendItem liquid">Liquid</div>
            <div className="iptLegendItem gas">Gas</div>
            <div className="iptLegendItem radio">Radioactive</div>
        </div>
    </div>
};

function InfoPane(props: {info: ElemInfo | null}) {

    return <div className="iptInfo">
        {props?.info !== null ? content() : null}
    </div>;

    function content() {
        const {name, mass, state, z, halfLife, p1, p2, p3} = props.info as ElemInfo;

        return  <>
            <div className="iptElemName">{name}</div>
            <div className="iptSubHeadLeft"><span className="bolded">Mass:</span> {mass}</div>
            <div className="iptSubHeadRight"><span className="bolded">State@STP:</span> {state}</div>
            <div className="iptSubHeadLeft"><span className="bolded">Half-life:</span> {halfLife ?? "Nonradioactive"}</div>
            <div className="iptSubHeadRight"><span className="bolded">Atomic Number:</span> {z}</div>

            <div className="iptParagraph">{p1}</div>
            <div className="iptParagraph">{p2}</div>
            <div className="iptParagraph">{p3}</div>
        </>
    }
}

function findElementBySymbol(symbol: string) {
    let result = null;
    elements.forEach(row => {
        const e = (row as ElemInfo[]).find(x => x.name !== undefined && x.symbol === symbol);
        if (e !== undefined) result = e;
    });

    return result ?? defaultSelection;
}