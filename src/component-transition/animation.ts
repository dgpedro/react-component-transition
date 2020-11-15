import { AnimationSettings, Variable } from "../types";
import {
    defaultTransitionDuration,
    defaultTransitionEasing,
} from "../animations/defaults";

// Limit (in pixels) when under animation duration will
// be adjusted to avoid having full animation duration
// in a short pixels distance.
const animationDurationThreshold = 100;

export const animateContainer = (
    element: HTMLElement,
    prevClientRect: ClientRect,
    nextClientRect: ClientRect,
    duration = defaultTransitionDuration,
    easing = defaultTransitionEasing,
) => {

    if (!element || !prevClientRect || !nextClientRect) {
        return null;
    }

    const { width: newWidth, height: newHeight } = nextClientRect;
    const { width, height } = prevClientRect;

    if (width === newWidth && height === newHeight) {
        return null;
    }

    const widthDelta = Math.abs(width - newWidth);
    const heightDelta = Math.abs(height - newHeight);

    const options: KeyframeAnimationOptions = {
        duration,
        easing,
    };

    if (
        typeof options.duration === "number" &&
        widthDelta < animationDurationThreshold &&
        heightDelta < animationDurationThreshold
    ) {
        const max = Math.max(widthDelta, heightDelta);
        options.duration = (max * options.duration) / animationDurationThreshold;
    }

    const transition: PropertyIndexedKeyframes = {
        width: [width + "px", newWidth + "px"],
        height: [height + "px", newHeight + "px"],
    };

    return element.animate(
        transition,
        options,
    );
};

export const animateEnter = (
    element: HTMLElement | null,
    clientRect: ClientRect | null,
    settings?: AnimationSettings | AnimationSettings[],
) => {
    return animateContent(element, clientRect, settings);
};

export const animateExit = (
    element: HTMLElement | null,
    clientRect: ClientRect | null,
    settings?: AnimationSettings | AnimationSettings[],
) => {

    let animationSettings = (Array.isArray(settings) ? settings : [settings]).filter((s) => s);

    // Enforce fill 'forwards' for exit animation
    for (const setting of animationSettings) {
        if (!setting.options) {
            setting.options = {
                fill: "forwards",
            };
            continue;
        }

        switch (setting.options.fill) {
            case "backwards":
            case "both":
                setting.options.fill = "both";
                break;
            default:
                setting.options.fill = "forwards";
        }
    }


    return animateContent(element, clientRect, animationSettings);
};

export async function finishAnimation(
    animation: Animation | Animation[],
) {
    const animationCount =
        Array.isArray(animation) ?
            animation.filter((a) => a).length :
            (animation ? 1 : 0);
    let counter = 0;

    return new Promise((resolve) => {

        if (!animationCount) {
            resolve();
        }

        const onFinish = () => {
            counter++;
            if (counter === animationCount) {
                resolve();
            }
        };

        animationCallback(animation, (anim) => {
            if (anim.playState === "finished") {
                onFinish();
            } else {
                anim.onfinish = onFinish;
            }
        });
    });
};

export const isAnimationRunning = (animation: Animation | Animation[] | null) => {
    let isRunning = false;
    animationCallback(animation, (anim) => {
        if (anim.playState === "running") {
            isRunning = true;
        }
    });

    return isRunning;
};

export const cancelAnimation = (animation: Animation | Animation[] | null) => {
    if (!animation) {
        return;
    }

    animationCallback(animation, (anim) => {
        anim.cancel();
    });
};

const animationCallback = (
    animation: Animation | Animation[] | null,
    callback: (animation: Animation) => void,
) => {
    const animationArray = Array.isArray(animation) ? animation : [animation];
    for (const anim of animationArray) {
        if (anim && callback) {
            callback(anim);
        }
    }
};

const animateContent = (
    element: HTMLElement | null,
    clientRect: ClientRect | null,
    settings?: AnimationSettings | AnimationSettings[],
) => {
    if (!element || !settings) {
        return null;
    }

    const settingsArray = (Array.isArray(settings) ? settings : [settings]).filter((s) => s);
    const settingsKeyframes: Array<Keyframe[] | PropertyIndexedKeyframes> = [];

    for (const setting of settingsArray) {
        let keyframes = setting.keyframes;

        if (clientRect) {
            if (Array.isArray(setting.keyframes)) {
                for (let i = 0, len = setting.keyframes.length; i < len; i++) {
                    (keyframes as Keyframe[])[i] = replaceKeyframeVariable(setting.keyframes[i], clientRect) as Keyframe;
                }
            } else {
                keyframes = replaceKeyframeVariable(setting.keyframes, clientRect) as PropertyIndexedKeyframes;
            }
        }

        settingsKeyframes.push(keyframes);
    }

    return settingsArray.map((setting, index) =>
        element.animate(settingsKeyframes[index], setting.options)
    );
};

const replaceKeyframeVariable = (keyframe: Keyframe | PropertyIndexedKeyframes, clientRect: ClientRect | null) => {
    if (!keyframe || !clientRect) {
        return keyframe;
    }

    const replacedKeyframe: Keyframe | PropertyIndexedKeyframes = { ...keyframe };

    const applyReplace = (value: string) => {
        let newValue = value;
        newValue = replaceVariable(newValue, clientRect.width.toString(), Variable.Width);
        newValue = replaceVariable(newValue, clientRect.height.toString(), Variable.Height);
        newValue = replaceVariable(newValue, clientRect.top.toString(), Variable.Top);
        newValue = replaceVariable(newValue, clientRect.bottom.toString(), Variable.Bottom);
        newValue = replaceVariable(newValue, clientRect.left.toString(), Variable.Left);
        newValue = replaceVariable(newValue, clientRect.right.toString(), Variable.Right);
        return newValue;
    };

    // tslint:disable-next-line: forin
    for (const index in keyframe) {

        const value = keyframe[index];

        if (typeof value === "string") {
            replacedKeyframe[index] = applyReplace(value);
        }

        if (Array.isArray(value)) {
            const valueArray = [];
            for (const keyframeValue of value) {
                if (typeof keyframeValue !== "string") {
                    valueArray.push(keyframeValue);
                    continue;
                }

                const newKeyframeValue = applyReplace(keyframeValue);
                valueArray.push(newKeyframeValue);
            }

            replacedKeyframe[index] = valueArray as (string[] | number[]);
        }
    }

    return replacedKeyframe;
};

const replaceVariable = (value: string, newValue: string, variable: Variable) => {
    if (!value || !variable) {
        return value;
    }

    const regExp = new RegExp(variable);

    if (regExp.test(value)) {
        return value.replace(variable, newValue);
    }

    return value;
};
