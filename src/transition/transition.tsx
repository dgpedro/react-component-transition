import React, { useRef, useEffect, useState, useCallback, useLayoutEffect, PropsWithChildren } from "react";
import { flushSync } from "react-dom";
import classnames from "classnames";

import { TransitionState } from "./animation-hooks/types";
import {
    AnimationHook,
    useContainerRectangle,
    useExitAnimation,
    useContainerAnimation,
    useEnterAnimation,
} from "./animation-hooks";

import { ComponentTransitionProps } from "../types";
import { defaultTransitionDuration, defaultTransitionEasing } from "../animations/defaults";

interface Props extends ComponentTransitionProps {
    inViewEnabled?: boolean;
    inViewRef?: (element: HTMLElement) => void;
}

export const Transition: React.FC<PropsWithChildren<Props>> = ({
    animateContainer,
    animateContainerDuration,
    animateContainerEasing,
    animateOnMount,
    children,
    className,
    classNameEnter,
    classNameExit,
    disabled,
    enterAnimation,
    exitAnimation,
    inViewRef,
    inViewEnabled,
    lazy,
    onEnterFinished,
    onExitFinished,
    style,
}) => {

    const [transitionState, setTransitionState] = useState<TransitionState>(
        children && !lazy && animateOnMount && !animateContainer ? TransitionState.ContainerRect : null
    );

    const prevChildren = useRef<React.ReactNode>(animateOnMount && animateContainer ? null : children);
    const containerRef = useRef<HTMLDivElement>(null);
    const unmounted = useRef(false);

    const hasChildrenChanged = didChildrenChanged(prevChildren.current, children);

    if (!hasChildrenChanged && !transitionState) {
        prevChildren.current = children;
    }

    const updatedState = (state: TransitionState) => {
        if (!unmounted.current) {
            setTransitionState(state);
        }
    };

    useEffect(() => () => {
        unmounted.current = true;
    }, []);

    useLayoutEffect(() => {
        if (inViewEnabled && animateOnMount && !animateContainer) {
            updatedState(TransitionState.ContainerRect);
        }
    }, [inViewEnabled]);

    // start exit transition if children changed
    useEffect(() => {
        if (!hasChildrenChanged) {
            return;
        }

        if (!transitionState) {
            updatedState(TransitionState.Exit);
        }
    });

    const animationHooks: AnimationHook = {
        children,
        getElement: () => containerRef.current,
        prevChildren: prevChildren.current,
        transitionState,
        disabled,
        onFinish: null,
    };

    const { nextClientRect, prevClientRect } = useContainerRectangle({
        ...animationHooks,
        onFinish: () => updatedState(TransitionState.Container),
    });

    const exitFinishedHandler = () => {
        onExitFinished && onExitFinished();
    };

    useExitAnimation({
        ...animationHooks,
        prevClientRect,
        settings: exitAnimation,
        onFinish: () => {
            const hadPrevChildren = !!prevChildren.current;
            prevChildren.current = children;
            if (hadPrevChildren && !animateContainer) {
                exitFinishedHandler();
            }

            // need to rerender the component after setting state to avoid animation blinking on animation exit
            flushSync(() => {
                updatedState(TransitionState.ContainerRect);
            })
        },
    });

    useContainerAnimation({
        ...animationHooks,
        prevClientRect,
        nextClientRect,
        animateContainer,
        animateContainerDuration,
        animateContainerEasing,
        onFinish: () => {
            if (!prevChildren.current && animateContainer) {
                exitFinishedHandler();
            }
            updatedState(TransitionState.Enter);
        },
    });

    useEnterAnimation({
        ...animationHooks,
        nextClientRect,
        settings: enterAnimation,
        onFinish: () => {
            if (prevChildren.current) {
                onEnterFinished && onEnterFinished();
            }
            updatedState(null);
        },
    });

    const shouldRenderPrevChildren = hasChildrenChanged || transitionState === TransitionState.Exit;
    const hideContent =
        (lazy && !inViewEnabled) ||
        transitionState === TransitionState.ContainerRect ||
        transitionState === TransitionState.Container;

    const setRefs = useCallback(
        (element: HTMLDivElement) => {
            containerRef.current = element;
            inViewRef && inViewRef(element);
        },
        [inViewRef],
    )

    if (!lazy && !hasChildrenChanged && !transitionState && !children) {
        return null;
    }

    return (
        <div
            ref={setRefs}
            className={
                classnames(
                    className,
                    transitionState === TransitionState.Enter && classNameEnter,
                    transitionState === TransitionState.Exit && classNameExit,
                ) || null}
            style={{
                ...style,
                opacity: hideContent ? 0 : null,
            }}
        >
            {
                shouldRenderPrevChildren ?
                    prevChildren.current :
                    children
            }
        </div>
    );
};

const didChildrenChanged = (prevChildren: React.ReactNode, children: React.ReactNode) => {
    const prevChildrenElement = prevChildren as React.ReactElement;
    const childrenElement = children as React.ReactElement;

    if (!prevChildren && !children) {
        return false;
    }

    if (!prevChildren && children) {
        return true;
    }

    if (prevChildren && !children) {
        return true;
    }

    if (
        prevChildrenElement.key === childrenElement.key &&
        prevChildrenElement.type === childrenElement.type
    ) {
        return false;
    }

    return true;
};

Transition.defaultProps = {
    animateContainer: false,
    animateContainerDuration: defaultTransitionDuration,
    animateContainerEasing: defaultTransitionEasing,
};

Transition.displayName = "Transition";

