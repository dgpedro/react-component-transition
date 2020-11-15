import {
    defaultExitDuration,
    defaultEnterDuration,
    defaultEasingEnter,
    defaultEasingExit,
} from "./defaults";

export const fade = {
    enter: {
        keyframes: {
            opacity: [0, 1],
        },
        options: { duration: defaultEnterDuration, easing: defaultEasingEnter },
    },
    exit: {
        keyframes: {
            opacity: [1, 0],
        },
        options: { duration: defaultExitDuration, easing: defaultEasingExit },
    },
};
