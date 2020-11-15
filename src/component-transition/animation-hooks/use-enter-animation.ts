import { useLayoutEffect, useRef, useEffect } from "react";

import { animateEnter, finishAnimation, cancelAnimation } from "../animation";
import { AnimationSettingsProp } from "../../types";
import { AnimationHook, TransitionState } from "./types";

interface EnterAnimationProps extends AnimationHook {
    nextClientRect: ClientRect;
    settings: AnimationSettingsProp;
}

export const useEnterAnimation = (props: EnterAnimationProps) => {

    const enterAnimation = useRef<Animation[]>([]);
    const isRunning = useRef(false);

    const {
        transitionState,
        prevChildren,
        element,
        nextClientRect,
        settings,
        disabled,
        onFinish,
    } = props;

    useEffect(() => () => {
        cancelAnimation(enterAnimation.current);
    }, []);

    const finish = async () => {
        await finishAnimation(enterAnimation.current);
        onFinish();
        isRunning.current = false;
    };

    useLayoutEffect(() => {
        if (transitionState !== TransitionState.Enter) {
            return;
        }

        if (!prevChildren || disabled) {
            onFinish();
            return;
        }

        if (isRunning.current) {
            finish();
            return;
        }

        isRunning.current = true;
        enterAnimation.current = animateEnter(element, nextClientRect, settings);

        finish();
    });
};
