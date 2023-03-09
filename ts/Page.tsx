import { ReactNode } from "react";
import NavBar from "./NavBar";

type PageProps = {
    children: ReactNode;
    width: 'normal' | 'wide';
};

const links=[
    "software",
    "renders",
    "blog",
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

export function PageList(props: { items: {jsx: JSX.Element; link?: string, openInNewTab?: boolean}[] }) {
    return (
        <>
            {props.items.map(( {jsx, link, openInNewTab}, index) => (
                <PageEntry key={`PageEntry${index}`} link={link} openInNewTab={openInNewTab}>
                    {jsx}
                </PageEntry>
            ))}
        </>
    );
}

export function PageEntry(props: { children: ReactNode, link?: string, openInNewTab?: boolean }) {
    const { link } = props;

    const linkAppend = link ? "pageEntryLink" : "";

    const entry = (
        <div className={`pageEntry ${linkAppend}`}>
            {props.children}
        </div>
    );

    const newTabProps = props.openInNewTab ? {
        target:"_blank",
        rel: "noopener noreferrer"
    } : {};

    return link ? <a href={link} {...newTabProps}>{entry}</a> : entry;
}