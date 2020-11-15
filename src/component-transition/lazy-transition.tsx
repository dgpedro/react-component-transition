import React from "react";
import { useInView, IntersectionOptions } from "react-intersection-observer";

import { ComponentTransitionProps } from "../types";
import { Transition } from "./transition";

interface LazyTransitionProps extends ComponentTransitionProps {
    inViewOptions?: IntersectionOptions;
}

export const LazyTransition: React.FC<LazyTransitionProps> = (props) => {
    const { inViewOptions, animateOnMount, children } = props;
    const [inViewRef, inView, entry] = useInView(inViewOptions);

    const observerWait = !entry && animateOnMount;

    return (
        <Transition {...props} inViewRef={inViewRef} disabled={!inView}>
            {observerWait ? null : children}
        </Transition>
    );
};
LazyTransition.displayName = "LazyTransition";
