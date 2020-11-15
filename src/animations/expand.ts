import { Variable } from "../types";
import {
    defaultEnterDuration,
    defaultEasingEnter,
    defaultEasingExit
} from "./defaults";

export const expand = {
    vertical: {
        keyframes: {
            height: ["0px", `${Variable.Height}px`],
        },
        options: { duration: defaultEnterDuration, easing: defaultEasingEnter },
    },
    horizontal: {
        keyframes: {
            width: ["0px", `${Variable.Width}px`],
        },
        options: { duration: defaultEnterDuration, easing: defaultEasingExit },
    },
};
