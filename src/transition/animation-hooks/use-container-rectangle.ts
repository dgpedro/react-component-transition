import { useLayoutEffect, useRef } from "react";

import { TransitionState, AnimationHook } from "./types";

interface ContainerRectangle extends AnimationHook { }

export const useContainerRectangle = (props: ContainerRectangle) => {

    const prevClientRect = useRef<ClientRect>(null);
    const nextClientRect = useRef<ClientRect>(null);

    const { transitionState, getElement, onFinish } = props;

    if (getElement() && transitionState === TransitionState.Exit) {
        prevClientRect.current = getElement().getBoundingClientRect();
    }

    useLayoutEffect(() => {
        if (getElement() && transitionState === TransitionState.ContainerRect) {
            nextClientRect.current = getElement().getBoundingClientRect();
            onFinish();
        }
    }, [transitionState]);

    return {
        prevClientRect: prevClientRect.current,
        nextClientRect: nextClientRect.current,
    };
};
