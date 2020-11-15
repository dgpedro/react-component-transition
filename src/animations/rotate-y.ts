import {
    defaultExitDuration,
    defaultEnterDuration,
    defaultEasingEnter,
    defaultEasingExit,
} from "./defaults";

export const rotateY = {
    enter: {
        keyframes: {
            transform: ["rotateY(90deg)", "rotateY(0deg)"],
        },
        options: { duration: defaultEnterDuration, easing: defaultEasingEnter },
    },
    exit: {
        keyframes: {
            transform: ["rotateY(0deg)", "rotateY(90deg)"],
        },
        options: { duration: defaultExitDuration, easing: defaultEasingExit },
    },
};
