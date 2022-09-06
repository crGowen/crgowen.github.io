import React, { ReactElement, useState } from "react";

export default function HoverHandler (props: { children: ReactElement[] | ReactElement }) {

    const children = Array.isArray(props.children) ? props.children : [props.children];

    return (
    <>
        {children.map((c, i) => (<HoverContainer key={i}>{c}</HoverContainer>))}
    </>
    );
}

function HoverContainer (props: { children: ReactElement }) {
    const [hover, setHover] = useState(false);
    const onHover = () => setHover(true);
    const onLeave = () => setHover(false);

    return (
        <div onMouseEnter={onHover} onMouseLeave={onLeave}>
            {React.cloneElement(
            props.children,
            {hover})}
        </div>
    );
}