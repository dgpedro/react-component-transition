import {
    defaultExitDuration,
    defaultEnterDuration,
    defaultEasingEnter,
    defaultEasingExit,
} from "./defaults";

export const slideUp = {
    enter: {
        keyframes: {
            transform: ["translate3d(0,-100%,0)", "translate3d(0,0%,0)"],
        },
        options: { duration: defaultEnterDuration, easing: defaultEasingEnter },
    },
    exit: {
        keyframes: {
            transform: ["translate3d(0,0%,0)", "translate3d(0,-100%,0)"],
        },
        options: { duration: defaultExitDuration, easing: defaultEasingExit },
    },
};
