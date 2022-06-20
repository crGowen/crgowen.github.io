import React, { useState } from "react";

type PageProps = {
    children: React.ReactNode;
    pageWidth?: 'normal' | 'wide';
};

const links=[
    "link1",
    "link2",
    "link3",
    "link4"
];
const styles = getStyles();

export default function Page(props: PageProps){
    const { children, pageWidth = 'normal' } = props;
    const style = pageWidth === 'normal' ? styles.normalPage : styles.widePage;

    return (
        <>
            <NavBar />
            <div style={style}>
                {children}
            </div>
        </>
    );
}

function NavBar() {
    const [hoveredElem, setHover] = useState<string | null>(null);
    return (
        <div style={styles.banner}>
            <div style={styles.bannerContent}>
                <div style={styles.logo}>crgowen.github.io</div>
                <div onMouseOut={() => setHover(null)} style={styles.linkRow}>
                    { links.map( link => <NavLink
                        key={`nav-link-${link}`}
                        text={link}
                        style={styles.link}
                        hlStyle={styles.linkHighlight}
                        hoveredElem={hoveredElem}
                        setHover={setHover}
                    />) }
                </div>
            </div>
        </div>
    );
}

function NavLink(props: {style: {[k:string]: string}; hlStyle: {[k:string]: string}; text: string;  hoveredElem: string | null; setHover: (x:string) => void}) {
    const {style, text, hoveredElem, setHover, hlStyle} = props;
    const hoverStyle = hoveredElem === text ? hlStyle : {};
    return (
        <a
            href={`#${text}`}
            onMouseOver={() => setHover(text)}
        >
            <div style={{...style, ...hoverStyle}}
            >
                {text}
            </div>
        </a>
    );
}

export function PageList(props: { items: JSX.Element[] }) {
    return (
        <>
            {props.items.map((x, index) => (
                <PageEntry key={`PageEntry${index}`}>
                    {x}
                </PageEntry>
            ))}
        </>
    );
}

export function PageEntry(props: { children: React.ReactNode }) {
    return (
        <div>
            {props.children}
        </div>
    );
}

function getStyles() {
    const accentColor = "#4682b4";
    const highlightColor = "#66a2c4";
    const navBarHeight = '3rem';
    const navLinkWidth = 10;
    const logoWidth = 11;
    const logoPadding = 1;
    const whiteColor = "#f2f2f2";
    const logoFontSize = 1.4;

    const normalWidth = `${logoWidth + logoPadding + navLinkWidth*links.length - 0.5}rem`;
    const wideWidth = `${logoWidth + logoPadding + navLinkWidth*links.length + 1.5}rem`;

    const banner = {
        backgroundColor: accentColor,
        width: '100%',
        height: navBarHeight
    };

    const bannerContent = {
        display: "flex",
        flexDirection: "row" as const,
        margin: '0 auto',
        minWidth: `${logoWidth + logoPadding + navLinkWidth*links.length}rem`,
        width: '45%',
        height: '100%',
        lineHeight: navBarHeight,
        whiteColor
    };

    const normalPage = {
        width: normalWidth,
        height: 'auto',
        margin: '0 auto'
    };

    const widePage = {
        ...normalPage,
        width: wideWidth,
    };

    const logo = {
        width: "40%",
        display: "block",
        fontFamily: "'Saira Condensed', sans-serif",
        height: '100%',
        paddingLeft: `${logoPadding}rem`,
        fontSize: `${logoFontSize}rem`,
        minWidth: `${logoWidth}rem`,
        userSelect: "none" as const
    };

    const linkRow = {
        width: "60%",
        minWidth: `${navLinkWidth*links.length}rem`,
        height: "100%",
        display: "flex",
        flexDirection: "row" as const,
        justifyContent: "space-between"
    };

    const link = {
        width: `${navLinkWidth}rem`,
        height: '100%',
        display: "block",
        textAlign: "center",
        whiteColor,
        fontFamily: "'Helvetica', sans-serif",
        userSelect: "none",
        cursor: "pointer"
    };

    const linkHighlight = {
        backgroundColor: highlightColor
    };

    return {
        banner,
        bannerContent,
        logo,
        link,
        linkRow,
        linkHighlight,
        normalPage,
        widePage
    };
}