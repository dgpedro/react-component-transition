import React from "react";
import { useInView, IntersectionOptions } from "react-intersection-observer";

import { ComponentTransitionProps } from "../types";
import { Transition } from "./transition";

interface LazyTransitionProps extends ComponentTransitionProps {
    inViewOptions?: IntersectionOptions;
}

export const LazyTransition = (props: React.PropsWithChildren<LazyTransitionProps>) => {
    const { animateOnMount, animateContainer, children, disabled, inViewOptions } = props;
    const [inViewRef, inView, entry] = useInView(inViewOptions);

    const observerWait = !entry && animateOnMount && animateContainer;

    return (
        <Transition {...props} inViewRef={inViewRef} inViewEnabled={!!entry} disabled={disabled || !inView}>
            {observerWait ? null : children}
        </Transition>
    );
};
LazyTransition.displayName = "LazyTransition";
