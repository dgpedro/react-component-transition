import React from "react";
import { NavLink, NavLinkProps } from "react-router-dom";
import Media from 'react-media';

export const MenuItem = (props: NavLinkProps) => {
    return (
        <Media query={{ maxWidth: 599 }}>
            {matches => (
                <li style={matches ? stylesMobile.item : styles.item}>
                    <NavLink {...props} style={matches ? stylesMobile.link : styles.link} activeStyle={matches ? stylesMobile.linkActive : styles.linkActive}>
                        <span style={styles.linkText}>{props.children}</span>
                    </NavLink>
                </li>
            )}
        </Media>
    );
};

const styles: { [index: string]: React.CSSProperties } = {
    item: {
        overflow: "hidden",
        transform: "translate3d(0, -10px, 0)",
        textAlign: "center",
    },
    link: {
        display: "block",
        width: "100px",
        textDecoration: "none",
        padding: "30px 10px",
        margin: "10px 0 10px 10px",
    },
    linkActive: {
        backgroundColor: "lavender",
        boxShadow: "grey -2px 2px 10px",
        borderRadius: "5px",
        borderTopRightRadius: "0",
        borderBottomRightRadius: "0",
    },
    linkText: {
        color: "royalblue",
    },
};

const stylesMobile: { [index: string]: React.CSSProperties } = {
    ...styles,
    item: {
        ...styles.item,
        transform: "translate3d(0, 0, 0)",
        width: "calc(100% / 3)",
    },
    link: {
        ...styles.link,
        width: "auto",
        textDecoration: "none",
        padding: "15px 0",
        margin: "10px 10px 0 10px",
    },
    linkActive: {
        ...styles.linkActive,
        borderBottomLeftRadius: "0",
        borderBottomRightRadius: "0",
    },
};
