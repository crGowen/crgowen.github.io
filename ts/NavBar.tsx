export default function NavBar(props: { links: string[] }) {    

    const navLinks = props.links.map( link => <NavLink
        key={`navlink-${link}`}
        text={link}
    />);

    return (
        <div className="banner">
            <div className="navbar">
                <div className="logo">crgowen.github.io</div>
                <div className="navlinkRow">
                    {navLinks}
                </div>
            </div>
        </div>
    );
}

function NavLink(props: { text: string }) {
    const { text } = props; 
    return (
        <a href={`#${text}`}>
            <div className="navlink">
                {text}
            </div>
        </a>
    );
}