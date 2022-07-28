import React, { useState } from "react";

type PageProps = {
    children: React.ReactNode;
    width: 'normal' | 'wide';
};

const links=[
    "software",
    "link2",
    "link3",
    "link4"
];

const accentColor = "#4682b4";
const highlightColor = "#66a2c4";
const navBarHeight = '3rem';
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
            <NavBar />
            <div style={width === 'normal' ? normalPage : widePage}>
                {children}
            </div>
        </>
    );
}

function NavBar() {
    const logoFontSize = 1.4;

    return (
        <div style={{
            backgroundColor: accentColor,
            width: '100%',
            height: navBarHeight
        }}>
            <div style={{
                display: "flex",
                flexDirection: "row" as const,
                margin: '0 auto',
                minWidth: `${baseWidth}rem`,
                width: '45%',
                height: '100%',
                lineHeight: navBarHeight,
                color: whiteColor
            }}>
                <div style={{
                    width: "40%",
                    display: "block",
                    fontFamily: "'Saira Condensed', sans-serif",
                    height: '100%',
                    paddingLeft: `${logoPadding}rem`,
                    fontSize: `${logoFontSize}rem`,
                    minWidth: `${logoWidth}rem`,
                    userSelect: "none" as const
                }}>crgowen.github.io</div>
                <div style={{
                    width: "60%",
                    minWidth: `${navLinkWidth*links.length}rem`,
                    height: "100%",
                    display: "flex",
                    flexDirection: "row" as const,
                    justifyContent: "space-between"
                }}>
                    { links.map( link => <NavLink
                        key={`nav-link-${link}`}
                        text={link}
                    />) }
                </div>
            </div>
        </div>
    );
}

function NavLink(props: {text: string; }) {
    const { text } = props;

    const [hover, setHover] = useState<boolean>(false);
    const hoverStyle = hover ? { backgroundColor: highlightColor } : {};

    return (
        <a
            href={`#${text}`}
            onMouseOver={() => setHover(true)}
            onMouseOut={() => setHover(false)}
        >
            <div style={{
                width: `${navLinkWidth}rem`,
                height: '100%',
                display: "block",
                textAlign: "center" as const,
                color: whiteColor,
                fontFamily: "'Helvetica', sans-serif",
                userSelect: "none" as const,
                cursor: "pointer",
                transition: "0.15s",
                ...hoverStyle
            }}>
                {text}
            </div>
        </a>
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

export function PageEntry(props: { children: React.ReactNode, link?: string }) {
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

    return link ? <a href={`#${link}`}>{entry}</a> : entry;
}