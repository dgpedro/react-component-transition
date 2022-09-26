import React, { useRef, useCallback } from "react";
import classnames from "classnames";

import { ComponentTransitionProps } from "../types";
import { defaultTransitionDuration, defaultTransitionEasing } from "../animations/defaults";

import { useTransition } from "./use-transition";

interface Props extends ComponentTransitionProps {
    inViewEnabled?: boolean;
    inViewRef?: (element: HTMLElement) => void;
}

export const Transition = ({
    animateContainer,
    animateContainerDuration,
    animateContainerEasing,
    children,
    className,
    enterAnimation,
    exitAnimation,
    inViewRef,
    onExitFinished,
    style,
}: React.PropsWithChildren<Props>) => {

    const prevChildren = useRef<React.ReactNode>(children);
    const containerRef = useRef<HTMLDivElement>(null);

    const onExited = () => {
        const hadPrevChildren = !!prevChildren.current;
        prevChildren.current = children;
        if (hadPrevChildren && !animateContainer) {
            onExitFinished?.();
        }
    };

    const {
        childrenToRender,
        transitionState,
    } = useTransition({
        animateContainer,
        animateContainerDuration,
        animateContainerEasing,
        children,
        element: containerRef.current,
        enterAnimation,
        exitAnimation,
        onExitFinished: onExited,
    });

    const hideContent = transitionState === "container";

    const setRefs = useCallback(
        (element: HTMLDivElement) => {
            containerRef.current = element;
            inViewRef && inViewRef(element);
        },
        [inViewRef],
    )

    return (
        <div
            ref={setRefs}
            className={
                classnames(
                    className,
                    // transitionState === TransitionState.Enter && classNameEnter,
                    // transitionState === TransitionState.Exit && classNameExit,
                ) || null}
            style={{
                ...style,
                opacity: hideContent ? 0 : null,
            }}
        >
            {childrenToRender}
        </div>
    );
};

Transition.defaultProps = {
    animateContainer: false,
    animateContainerDuration: defaultTransitionDuration,
    animateContainerEasing: defaultTransitionEasing,
};

Transition.displayName = "Transition";
