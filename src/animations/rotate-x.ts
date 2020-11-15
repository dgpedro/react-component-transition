import {
    defaultExitDuration,
    defaultEnterDuration,
    defaultEasingEnter,
    defaultEasingExit,
} from "./defaults";

export const rotateX = {
    enter: {
        keyframes: {
            transform: ["rotateX(90deg)", "rotateX(0deg)"],
        },
        options: { duration: defaultEnterDuration, easing: defaultEasingEnter },
    },
    exit: {
        keyframes: {
            transform: ["rotateX(0deg)", "rotateX(90deg)"],
        },
        options: { duration: defaultExitDuration, easing: defaultEasingExit },
    },
};
