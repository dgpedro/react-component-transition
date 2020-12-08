import React, { useRef, useEffect, useState, useCallback, useContext } from "react";
import classnames from "classnames";

import { TransitionState } from "./animation-hooks/types";
import {
    AnimationHook,
    useContainerRectangle,
    useExitAnimation,
    useContainerAnimation,
    useEnterAnimation,
} from "./animation-hooks";
import { TransitionContext } from "./transition-context";

import { ComponentTransitionProps } from "../types";
import { defaultTransitionDuration, defaultTransitionEasing } from "../animations/defaults";

interface Props extends ComponentTransitionProps {
    inViewRef?: (element: HTMLElement) => void;
}

export const Transition: React.FC<Props> = ({
    animateContainer,
    animateContainerDuration,
    animateContainerEasing,
    animateOnMount: animateOnMountProp,
    children: childrenProp,
    className,
    classNameEnter,
    classNameExit,
    disabled,
    enterAnimation,
    exitAnimation,
    inViewRef,
    onEnterFinished,
    onExitFinished,
    style,
}) => {

    const [transitionState, setTransitionState] = useState<TransitionState>(null);

    const context = useContext(TransitionContext);

    const children = context?.shouldExit ? null : childrenProp;
    const animateOnMount = context?.shouldEnter || animateOnMountProp;

    const prevChildren = useRef<React.ReactNode>(animateOnMount ? null : children);
    const containerRef = useRef<HTMLDivElement>(null);
    const unmounted = useRef(false);

    const hasChildrenChanged = didChildrenChanged(prevChildren.current, children);

    if (!hasChildrenChanged && !transitionState) {
        prevChildren.current = children;
    }

    useEffect(() => () => unmounted.current = true, []);

    // start exit transition if children changed
    useEffect(() => {
        if (!hasChildrenChanged) {
            return;
        }

        if (!transitionState) {
            setTransitionState(TransitionState.Exit);
        }
    });

    const udpatedState = (state: TransitionState) => {
        if (!unmounted.current) {
            setTransitionState(state);
        }
    };

    const animationHooks: AnimationHook = {
        children,
        element: containerRef.current,
        prevChildren: prevChildren.current,
        transitionState,
        disabled,
        onFinish: null,
    };

    const { nextClientRect, prevClientRect } = useContainerRectangle({
        ...animationHooks,
        onFinish: () => udpatedState(TransitionState.Container),
    });

    const exitFinishedHandler = () => {
        onExitFinished && onExitFinished();
        // listId && onExitFinishedListCallback && onExitFinishedListCallback(listId);
        if (context?.contextId && context?.onExitFinished) {
            context.onExitFinished(context.contextId);
        }
    };

    useExitAnimation({
        ...animationHooks,
        prevClientRect: prevClientRect,
        settings: exitAnimation,
        onFinish: () => {
            const hadPrevChildren = !!prevChildren.current;
            prevChildren.current = children;
            if (hadPrevChildren && prevChildren.current) {
                exitFinishedHandler();
            }
            udpatedState(TransitionState.ContainerRect);
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
            if (!prevChildren.current) {
                exitFinishedHandler();
            }
            udpatedState(TransitionState.Enter);
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
            udpatedState(null);
        },
    });

    const shouldRenderPrevChildren = hasChildrenChanged || transitionState === TransitionState.Exit;
    const hideContent = transitionState === TransitionState.Container;

    const setRefs = useCallback(
        (element: HTMLDivElement) => {
            containerRef.current = element;
            inViewRef && inViewRef(element);
        },
        [inViewRef],
    )

    if (!hasChildrenChanged && !transitionState && !children) {
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
