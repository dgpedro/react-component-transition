import React, { useState } from "react";

import { TransitionSlideUp } from "../../../../src/presets";
import { Box, BoxColor } from "../../components";

export const SlideUp: React.FC = () => {

    const [show, setShow] = useState(true);

    const onClick = () => {
        setShow(() => !show);
    };

    return (
        <div style={styles.container}>
            <button style={styles.button} onClick={onClick}>
                <span style={styles.text}>{show ? "Less" : "More"}</span>
                <span style={show ? styles.arrowUp : styles.arrowDown}></span>
            </button>
            <div style={styles.transitionContainer}>
                <TransitionSlideUp>
                    {
                        show && <Box color={BoxColor.yellowGreen} />
                    }
                </TransitionSlideUp>
            </div>
        </div>
    );
};

const arrowStyles: React.CSSProperties = {
    border: "solid black",
    borderWidth: "0 3px 3px 0",
    display: "inline-block",
    padding: "3px",
};

const styles: { [index: string]: React.CSSProperties } = {
    container: {
        borderTop: "1px dashed #ccc",
        textAlign: "center",
    },
    transitionContainer: {
        overflow: "hidden",
    },
    button: {
        display: "inline-block",
        border: 0,
        backgroundColor: "white",
        padding: "0 50px",
        transform: "translate3d(0, -50%, 0)",
        cursor: "pointer",
    },
    text: {
        padding: "0 20px",
    },
    arrowUp: {
        ...arrowStyles,
        transform: "rotate(-135deg)",
    },
    arrowDown: {
        ...arrowStyles,
        transform: "rotate(45deg)",
    },
};

