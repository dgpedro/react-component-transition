import {
    defaultExitDuration,
    defaultEnterDuration,
    defaultEasingEnter,
    defaultEasingExit,
} from "./defaults";

export const rotate = {
    enter: {
        keyframes: {
            transform: ["rotate(90deg)", "rotate(0deg)"],
        },
        options: { duration: defaultEnterDuration, easing: defaultEasingEnter },
    },
    exit: {
        keyframes: {
            transform: ["rotate(0deg)", "rotate(90deg)"],
        },
        options: { duration: defaultExitDuration, easing: defaultEasingExit },
    },
};
