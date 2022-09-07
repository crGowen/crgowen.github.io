import { ReactNode } from "react";
import NavBar from "./NavBar";

type PageProps = {
    children: ReactNode;
    width: 'normal' | 'wide';
};

const links=[
    "software",
    "renders",
    "extra",
    "about"
];

export default function Page(props: PageProps){
    const { children, width } = props;

    const wideAppend = width === "wide" ? "wide" : "";
    return (
        <>
            <NavBar links={links} />
            <div className={`page ${wideAppend}`} >
                {children}
            </div>
        </>
    );
}

export function PageList(props: { items: {jsx: JSX.Element; link?: string}[] }) {
    return (
        <>
            {props.items.map(( {jsx, link}, index) => (
                <PageEntry key={`PageEntry${index}`} link={link}>
                    {jsx}
                </PageEntry>
            ))}
        </>
    );
}

export function PageEntry(props: { children: ReactNode, link?: string }) {
    const { link } = props;

    const linkAppend = link ? "pageEntryLink" : "";

    const entry = (
        <div className={`pageEntry ${linkAppend}`}>
            {props.children}
        </div>
    );

    return link ? <a href={link}>{entry}</a> : entry;
}