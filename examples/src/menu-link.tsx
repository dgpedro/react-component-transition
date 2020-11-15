import React from "react";
import { NavLink, NavLinkProps } from "react-router-dom";

export const MenuItem: React.FC<NavLinkProps> = (props) => {
    return (
        <li style={styles.item}>
            <NavLink {...props} style={styles.link} activeStyle={{ textDecoration: "underline" }}>
                <span style={styles.linkText}>{props.children}</span>
            </NavLink>
        </li>
    );
};

const styles: { [index: string]: React.CSSProperties } = {
    item: {
        padding: "5px 0",
    },
    link: {
        textDecoration: "none",
    },
    linkText: {
        color: "royalblue",
    },
};
