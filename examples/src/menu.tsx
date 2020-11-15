import React from "react";

import { MenuItem } from "./menu-link";

export const Menu: React.FC = () => {
    return (
        <ul style={styles.list}>
            <MenuItem to="/show-hide">Show/hide</MenuItem>
            <MenuItem to="/transition">Transition</MenuItem>
            <MenuItem to="/list">List</MenuItem>
        </ul>
    );
};

const styles: { [index: string]: React.CSSProperties } = {
    list: {
        listStyle: "none",
        padding: "0",
        margin: "0",
    }
};
