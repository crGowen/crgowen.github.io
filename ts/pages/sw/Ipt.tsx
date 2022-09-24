import Page, { PageEntry } from "../../Page";
import {elements, Elem, ElemInfo, Spacer, RowSubstitution} from "../../data/iptElems";

export default function Ipt() {
    return (
        <Page width="wide">
            <PageEntry>
                <div className="iptContainer">
                    <Table />
                    <InfoPane />
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
    const EntryType = getEntryType(data);
    if (EntryType === undefined) return null;

    return (<EntryType data={data as any} />);
}

function getEntryType(d: any) {
    const types = {
        name: ElemSq,
        spaces: RowSpacer,
        rowSub: RowSub
    };

    const resolved = Object.entries(types).find(([key, _]) => d[key] !== undefined);
    return resolved && resolved[1];
}

function ElemSq(props: {data: ElemInfo}) {
    return <div className="iptSq iptElem">{props.data.symbol}</div>;
}

function RowSpacer(props: {data: Spacer}) {
    const arr = [...new Array(props.data.spaces).keys()];

    return <>
        {arr.map(x => <div key={`iptSpacer +${x}`} className="iptSq"></div>)}
    </>
}

function RowSub(props: {data: RowSubstitution}) {
    console.log(props);
    return null;
}

function Table() {
    return <div className="iptTable">
        {elements.map((x, i) => <Period key={i} elems={x}/>)}
    </div>;
}

function InfoPane() {
    return <div className="iptInfo"></div>;
}