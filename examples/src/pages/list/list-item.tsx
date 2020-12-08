import React from "react";

import { ComponentTransition, AnimationTypes, AnimationSettings } from "../../../../src";
import { Box, BoxColor, Size } from "../../components";

interface Props {
    index: number;
    color: BoxColor;
    onAdd: (index: number) => void;
    onRemove: (index: number) => void;
}

export const ListItem: React.FC<Props> = React.memo(({
    index,
    color,
    onAdd,
    onRemove,
}) => {
    return (
        <div style={styles.listItemContainer}>
            <ComponentTransition
                animateContainer={true}
                enterAnimation={enterAnimation}
                exitAnimation={index % 2 === 0 ? exitLeft : exitRight}
                style={styles.transition}
            >
                <div style={styles.listItem}>
                    <Box
                        color={color}
                        size={Size.Small}
                    />
                    <button
                        type="button"
                        style={{ ...styles.button, ...styles.cross }}
                        onClick={onRemove.bind(null, index)}
                    >X</button>
                    <div style={styles.plusContainer}>
                        <button
                            type="button"
                            style={{ ...styles.button, ...styles.plus }}
                            onClick={onAdd.bind(null, index)}
                        >+</button>
                    </div>
                </div>
            </ComponentTransition>
        </div>
    );
});

const enterAnimation: AnimationSettings = {
    keyframes: [
        { transform: "translate3d(0,-100%,0)" },
        { transform: "translate3d(0,-50%,0)" },
        { transform: "translate3d(0,50%,0)" },
        { transform: "translate3d(0,25%,0)" },
        { transform: "translate3d(0,-25%,0)" },
        { transform: "translate3d(0,10%,0)" },
        { transform: "translate3d(0,-10%,0)" },
        { transform: "translate3d(0,5%,0)" },
        { transform: "translate3d(0,-5%,0)" },
        { transform: "translate3d(0,0,0)" },
    ],
    options: {
        duration: 500,
    }
};

const exitFade: AnimationSettings =
{
    keyframes: AnimationTypes.fade.exit.keyframes,
    options: { ...AnimationTypes.fade.exit.options, delay: 200 },
};

const exitLeft: AnimationSettings[] = [
    {
        keyframes: AnimationTypes.slideLeft.exit.keyframes,
        options: { ...AnimationTypes.slideLeft.exit.options, duration: 200 }
    },
    exitFade,
];

const exitRight: AnimationSettings[] = [
    {
        keyframes: AnimationTypes.slideRight.exit.keyframes,
        options: { ...AnimationTypes.slideRight.exit.options, duration: 200 }
    },
    exitFade,
];

const styles: { [index: string]: React.CSSProperties } = {
    listItemContainer: {
        width: "300px",
        overflow: "hidden",
    },
    transition: {
        width: "100px",
        margin: "auto",
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
}
