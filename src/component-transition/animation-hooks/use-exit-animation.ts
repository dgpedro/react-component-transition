import { useEffect, useRef } from "react";

import { AnimationSettingsProp } from "../../types";
import {
    animateExit,
    finishAnimation,
    cancelAnimation,
} from "../animation";
import { AnimationHook, TransitionState } from "./types";

interface ExitAnimationProps extends AnimationHook {
    settings: AnimationSettingsProp;
    prevClientRect: ClientRect;
}

export const useExitAnimation = (props: ExitAnimationProps) => {
    const exitAnimation = useRef<Animation[]>([]);
    const isRunning = useRef(false);

    const {
        prevChildren,
        onFinish,
        transitionState,
        element,
        settings,
        prevClientRect,
        disabled,
    } = props;

    useEffect(() => () => {
        cancelAnimation(exitAnimation.current);
    }, []);

    const finish = async () => {
        await finishAnimation(exitAnimation.current);
        // Cancel the fill: "forwards" set by animateExit
        cancelAnimation(exitAnimation.current);
        onFinish();
        isRunning.current = false;
    };

    useEffect(() => {
        if (transitionState !== TransitionState.Exit) {
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

        // Cancel the fill: "forwards" set by animateExit
        cancelAnimation(exitAnimation.current);

        isRunning.current = true;
        exitAnimation.current = animateExit(element, prevClientRect, settings);

        finish();
    });
};
