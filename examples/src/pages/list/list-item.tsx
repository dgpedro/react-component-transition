import React from "react";

import { ComponentTransition, ComponentTransitionProps, AnimationTypes, AnimationSettings } from "../../../../src";

interface Props extends ComponentTransitionProps {
    index: number;
}

export const ListItem: React.FC<Props> = React.memo(({ index, ...props }) => {

    console.log(`======================= RENDER ${index} =============================`);

    return (
        <div style={styles.listItem}>
            <ComponentTransition
                animateContainer={true}
                enterAnimation={enterAnimation}
                exitAnimation={index % 2 === 0 ? exitLeft : exitRight}
                style={styles.transition}
                {...props}
            />
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
    listItem: {
        width: "300px",
        overflow: "hidden",
    },
    transition: {
        width: "100px",
        margin: "auto",
    },
}
