import React from "react";
import Media from 'react-media';

import { MenuItem } from "./menu-link";

export const Menu: React.FC = () => {
    return (
        <Media query={{ maxWidth: 599 }}>
            {matches => (
                <ul style={matches ? stylesMobile.list : styles.list}>
                    <MenuItem to="/show-hide">Show/hide</MenuItem>
                    <MenuItem to="/transition">Transition</MenuItem>
                    <MenuItem to="/list">List</MenuItem>
                </ul>
            )}
        </Media>
    );
};

const styles: { [index: string]: React.CSSProperties } = {
    list: {
        listStyle: "none",
        padding: "0",
        margin: "0",
    }
};

const stylesMobile: { [index: string]: React.CSSProperties } = {
    list: {
        ...styles.list,
        display: "flex",
    }
};
