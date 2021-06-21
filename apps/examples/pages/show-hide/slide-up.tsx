import React, { useState } from "react";

import { ComponentTransition, AnimationTypes } from "@src";
import { Box, BoxColor } from "../../components";

export const SlideUp: React.FC = () => {

    const [show, setShow] = useState(true);

    const onClick = () => {
        setShow(() => !show);
    };

    return (
        <div className="slide-up-container" style={styles.container}>
            <button id="slide-up-button" style={styles.button} onClick={onClick}>
                <span style={styles.text}>{show ? "Less" : "More"}</span>
                <span style={show ? styles.arrowUp : styles.arrowDown}></span>
            </button>
            <div style={styles.transitionContainer}>
                <ComponentTransition
                    enterAnimation={AnimationTypes.slideUp.enter}
                    exitAnimation={{
                        ...AnimationTypes.slideUp.exit,
                        options: {
                            ...AnimationTypes.slideUp.exit.options,
                            duration: 800,
                        },
                    }}
                >
                    {
                        show && <Box color={BoxColor.yellowGreen} />
                    }
                </ComponentTransition>
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

