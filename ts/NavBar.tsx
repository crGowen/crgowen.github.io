import HoverStyle from "./HoverChildren";

type NavBarProps = {
    accentColor: string;
    baseWidth: number;
    whiteColor: string;
    logoPadding: number;
    logoWidth: number;
    navLinkWidth: number;
    links: string[];
};

type NavLinkProps = {
    text: string;
    navLinkWidth: number;
    whiteColor: string;
    hover: boolean;
};

const highlightColor = "#66a2c4";
const navBarHeight = '3rem';
const logoFontSize = 1.4;

export default function NavBar(props: NavBarProps) {    
    const { accentColor, baseWidth, whiteColor, logoPadding, logoWidth, navLinkWidth, links } = props;

    const navLinks = links.map( link => <NavLink
        key={`nav-link-${link}`}
        text={link}
        navLinkWidth={navLinkWidth}
        whiteColor={whiteColor}
        hover={false}
    />);

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
                    padding: `0 ${logoPadding}rem`,
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
                    <HoverStyle>
                        {navLinks}
                    </HoverStyle>
                </div>
            </div>
        </div>
    );
}

function NavLink(props: NavLinkProps) {
    const { text, navLinkWidth, whiteColor, hover } = props;

    const hoverStyle = hover ? { backgroundColor: highlightColor } : {};

    return (
        <a
            href={`#${text}`}
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