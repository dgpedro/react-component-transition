import React, { useState } from "react";
import uniqid from "uniqid";

import { Box, BoxColor, MainContainer, Size } from "../../components";
import { ComponentTransitionList } from "../../../../src";
import { ListItem } from "./list-item";

interface State {
    id: string;
    color: BoxColor;
}

export const List = () => {
    const [items, setItems] = useState<State[]>([
        newItem(),
        newItem(),
        newItem(),
    ]);

    const add = (index: number) => {
        setItems((list) =>
            [...list.slice(0, index + 1), newItem(), ...list.slice(index + 1)]);
    };

    const remove = (index: number) => {
        setItems((list) => list.filter((_, i) => i !== index));
    };

    return (
        <MainContainer>
            <div style={styles.list}>
                <ComponentTransitionList>
                    {items.map(({ id, color }, index) => (
                        <ListItem key={id} index={index}>
                            <div style={styles.listItem}>
                                <Box
                                    color={color}
                                    size={Size.Small}
                                />
                                <button
                                    type="button"
                                    style={{ ...styles.button, ...styles.cross }}
                                    onClick={remove.bind(null, index)}
                                >X</button>
                                <div style={styles.plusContainer}>
                                    <button
                                        type="button"
                                        style={{ ...styles.button, ...styles.plus }}
                                        onClick={add.bind(null, index)}
                                    >+</button>
                                </div>
                            </div>
                        </ListItem>
                    ))}
                </ComponentTransitionList>
            </div>
        </MainContainer>
    );
};

const newItem = () => ({ id: uniqid(), color: randomColor() });

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
    list: {
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
    },
    listItem: {
        position: "relative",
        padding: "5px 0",
    },
    button: {
        fontWeight: "bold",
        backgroundColor: "white",
        border: "1px solid",
        cursor: "pointer",
        lineHeight: "10px",
        padding: "2px 4px",
        fontFamily: "cursive",
    },
    plusContainer: {
        width: "100%",
        position: "absolute",
        bottom: "8px",
        textAlign: "center",
    },
    plus: {
        color: "green",
        borderColor: "green",
        width: "70%",
    },
    cross: {
        position: "absolute",
        top: "10px",
        right: "5px",
        color: "red",
        borderColor: "red",
        borderRadius: "25%",
        fontSize: "smaller",
    },
};
