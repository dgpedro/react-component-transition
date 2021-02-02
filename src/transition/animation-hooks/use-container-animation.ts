import { useLayoutEffect, useRef, useEffect } from "react";

import { ContainerProps } from "../../types";
import { animateContainer as startAnimation, finishAnimation, cancelAnimation } from "../animation";
import { AnimationHook, TransitionState } from "./types";

interface ContainerAnimationProps extends AnimationHook, ContainerProps {
    prevClientRect: ClientRect;
    nextClientRect: ClientRect;
}

export const useContainerAnimation = (props: ContainerAnimationProps) => {

    const {
        transitionState,
        prevClientRect,
        nextClientRect,
        animateContainer,
        onFinish,
        getElement,
        disabled,
    } = props;

    const transitionAnimation = useRef<Animation>(null);
    const isRunning = useRef(false);

    useEffect(() => () => {
        cancelAnimation(transitionAnimation.current);
    }, []);

    const finish = async () => {
        await finishAnimation(transitionAnimation.current);
        onFinish();
        isRunning.current = false;
    };

    useLayoutEffect(() => {
        if (transitionState !== TransitionState.Container) {
            return;
        }

        if (!getElement() || !animateContainer || !prevClientRect || disabled) {
            onFinish();
            return;
        }

        if (isRunning.current) {
            return;
        }

        isRunning.current = true;

        transitionAnimation.current = startAnimation(
            getElement(),
            prevClientRect,
            nextClientRect,
            props.animateContainerDuration,
            props.animateContainerEasing,
        );

        finish();
    });
};
