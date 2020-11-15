import { Variable } from "../types";
import {
    defaultExitDuration,
    defaultEasingEnter,
    defaultEasingExit
} from "./defaults";

export const collapse = {
    vertical: {
        keyframes: {
            height: [`${Variable.Height}px`, "0px"],
        },
        options: { duration: defaultExitDuration, easing: defaultEasingEnter },
    },
    horizontal: {
        keyframes: {
            width: [`${Variable.Width}px`, "0px"],
        },
        options: { duration: defaultExitDuration, easing: defaultEasingExit },
    },
};
