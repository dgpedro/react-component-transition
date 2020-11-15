import {
    defaultExitDuration,
    defaultEnterDuration,
    defaultEasingEnter,
    defaultEasingExit,
} from "./defaults";

export const slideLeft = {
    enter: {
        keyframes: {
            transform: ["translate3d(-100%,0,0)", "translate3d(0%,0,0)"],
        },
        options: { duration: defaultEnterDuration, easing: defaultEasingEnter },
    },
    exit: {
        keyframes: {
            transform: ["translate3d(0%,0,0)", "translate3d(-100%,0,0)"],
        },
        options: { duration: defaultExitDuration, easing: defaultEasingExit },
    },
};
