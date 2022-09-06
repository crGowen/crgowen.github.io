import { ReactNode, useState } from "react";
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

const accentColor = "#4682b4";
const navLinkWidth = 12;
const logoWidth = 11;
const logoPadding = 0.5;
const whiteColor = "#f2f2f2";
const blackColor = "#353535";
const baseWidth = logoWidth + logoPadding + navLinkWidth*links.length;

export default function Page(props: PageProps){
    const { children, width } = props;

    const normalWidth = `${baseWidth - 4}rem`;
    const wideWidth = `${baseWidth - 1}rem`;

    const normalPage =  {
        width: normalWidth,
        height: 'auto',
        margin: '0 auto'
    };

    const widePage = {
        ...normalPage,
        width: wideWidth,
    };

    return (
        <>
            <NavBar {...{
                accentColor,
                baseWidth,
                whiteColor,
                logoPadding,
                logoWidth,
                navLinkWidth,
                links
            }} />
            <div style={width === 'normal' ? normalPage : widePage}>
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
    const [hover, setHover] = useState<boolean>(false);
    const hoverStyle = hover ? { boxShadow: `0 0 5px 0.08rem ${accentColor}` } : {};
    const pageEntryPadding = 0.6

    const { link } = props;

    const entry = (
        <div style={{
            backgroundColor: whiteColor,
            color: blackColor,
            marginTop: '0.6rem',
            padding: `0.4rem ${pageEntryPadding}rem`,
            width: `calc(100% -  ${pageEntryPadding*2}rem)`,
            borderRadius: '0.25rem',
            minHeight: '5.5rem',
            fontFamily: "'Raleway', sans-serif",
            userSelect: "none",
            cursor: link ? "pointer" : "default",
            transition: "0.15s",
            ...hoverStyle
        }}
            onMouseOver={() => setHover(link !== undefined)}
            onMouseOut={() => setHover(false)}
        >
            {props.children}
        </div>
    );

    return link ? <a href={link}>{entry}</a> : entry;
}