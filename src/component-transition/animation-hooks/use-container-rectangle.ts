import { useLayoutEffect, useRef } from "react";

import { TransitionState, AnimationHook } from "./types";

interface ContainerRectangle extends AnimationHook { }

export const useContainerRectangle = (props: ContainerRectangle) => {

    const prevClientRect = useRef<ClientRect>(null);
    const nextClientRect = useRef<ClientRect>(null);

    const { transitionState, element, onFinish } = props;

    if (element && transitionState === TransitionState.Exit) {
        prevClientRect.current = element.getBoundingClientRect();
    }

    useLayoutEffect(() => {
        if (element && transitionState === TransitionState.ContainerRect) {
            nextClientRect.current = element.getBoundingClientRect();
            onFinish();
        }
    }, [transitionState]);

    return {
        prevClientRect: prevClientRect.current,
        nextClientRect: nextClientRect.current,
    };
};
