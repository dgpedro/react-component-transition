import React, { PropsWithChildren } from "react";

export enum BoxColor {
    blueRed = "blueRed",
    yellowGreen = "yellowGreen",
    grayCyan = "grayCyan",
    cyanGray = "cyanGray",
    beigeBlue = "beigeBlue",
}

export enum Size {
    Regular = "regular",
    Small = "small",
}

interface BoxProps {
    color?: BoxColor;
    size?: Size;
}

export const Box: React.FC<PropsWithChildren<BoxProps>> = ({
    color,
    size,
    children,
}) => {

    const style = { ...(size !== undefined ? sizeStyles[size] : {}), ...(color !== undefined ? colorStyles[color] : {}) };

    return (
        <div
            style={style}
        >
            {children}
        </div>
    );
};

Box.defaultProps = {
    color: BoxColor.blueRed,
    size: Size.Regular,
};

const sizeStyles: { [index: string]: React.CSSProperties } = {
    regular: {
        padding: "40px",
        textAlign: "center",
    },
    small: {
        padding: "20px",
        textAlign: "center",
    },
}

const colorStyles: { [index: string]: React.CSSProperties } = {
    blueRed: {
        backgroundColor: "lightblue",
        border: "25px solid lightcoral",
    },
    yellowGreen: {
        backgroundColor: "lightyellow",
        border: "25px solid lightgreen",
    },
    grayCyan: {
        backgroundColor: "lightgray",
        border: "25px solid lightcyan",
    },
    cyanGray: {
        backgroundColor: "lightcyan",
        border: "25px solid lightgray",
    },
    beigeBlue: {
        backgroundColor: "beige",
        border: "25px solid lightblue",
    },
};
