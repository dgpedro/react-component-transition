import React from "react";

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
    id?: string;
    size?: Size;
}

export const Box: React.FC<BoxProps> = ({
    color,
    id,
    size,
    children,
}) => {

    const style = { ...sizeStyles[size], ...colorStyles[color] };

    return (
        <div
            id={id}
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
