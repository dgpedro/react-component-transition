import React, { useState } from "react";

import { Box, BoxColor, Size } from "@apps/shared/box";
import { ComponentTransitionList, ComponentTransition, Presets, AnimationTypes } from "@src";

export const List = () => {
    const [items, setItems] = useState<BoxColor[]>([randomColor()]);

    const add = () => {
        setItems((list) => [...list, randomColor()]);
    };

    const remove = () => {
        setItems((list) => {
            if (list.length <= 1) {
                return list;
            }
            return [...list.slice(0, list.length - 1)];
        });
    };

    return (
        <div>
            <div style={styles.buttonsContainer}>
                <div style={styles.buttonDelete}>
                    <ComponentTransition
                        enterAnimation={{
                            ...AnimationTypes.slideUp.enter,
                            keyframes: { transform: ["translateY(-80px)", "translateY(0)"] },
                        }}
                        exitAnimation={{
                            ...AnimationTypes.slideUp.exit,
                            keyframes: { transform: ["translateY(0)", "translateY(-80px)"] },
                        }}
                    >
                        {items.length > 1 && (
                            <button
                                type="button"
                                style={{ ...styles.button, ...styles.removeButton }}
                                onClick={remove}
                            >X</button>
                        )}
                    </ComponentTransition>
                </div>
                <div style={styles.buttonAdd}>
                    <button
                        type="button"
                        style={{ ...styles.button, ...styles.addButton }}
                        onClick={add}
                    >+</button>
                </div>
            </div>
            <ComponentTransitionList>
                {items.map((color, index) => (
                    <Presets.TransitionFade lazy={true} key={index}>
                        <div style={styles.boxContainer}>
                            <Box
                                color={color}
                                size={Size.Small}
                            />
                        </div>
                    </Presets.TransitionFade>
                ))}
            </ComponentTransitionList>
        </div>
    );
};

const randomColor = () => colorsMap[randomInt(0, 4)];

const randomInt = (min: number, max: number) => {
    return min + Math.floor(((max + 1) - min) * Math.random());
}

const colorsMap: { [index: number]: BoxColor } = {
    0: BoxColor.blueRed,
    1: BoxColor.yellowGreen,
    2: BoxColor.grayCyan,
    3: BoxColor.cyanGray,
    4: BoxColor.beigeBlue,
};

const styles: { [index: string]: React.CSSProperties } = {
    boxContainer: {
        margin: "10px 0",
    },
    buttonsContainer: {
        display: "flex",
        width: "100%,"
    },
    buttonDelete: {
        width: "50%",
        textAlign: "right",
    },
    buttonAdd: {
        width: "50%",
        textAlign: "left",
    },
    button: {
        fontWeight: "bold",
        backgroundColor: "white",
        border: "1px solid",
        cursor: "pointer",
        lineHeight: "10px",
        padding: "2px 4px",
        fontFamily: "cursive",
        width: "50px",
        margin: "10px",
    },
    addButton: {
        color: "green",
        borderColor: "green",
    },
    removeButton: {
        color: "red",
        borderColor: "red",
        fontSize: "smaller",
    },
};
