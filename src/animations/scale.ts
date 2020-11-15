import {
    defaultExitDuration,
    defaultEnterDuration,
    defaultEasingEnter,
    defaultEasingExit,
} from "./defaults";

export const scale = {
    enter: {
        keyframes: {
            transform: ["scale(0)", "scale(1)"],
        },
        options: { duration: defaultEnterDuration, easing: defaultEasingEnter },
    },
    exit: {
        keyframes: {
            transform: ["scale(1)", "scale(0)"],
        },
        options: { duration: defaultExitDuration, easing: defaultEasingExit },
    },
};
