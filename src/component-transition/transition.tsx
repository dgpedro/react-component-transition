import React, { useRef, useEffect, useState, useCallback } from "react";
import classnames from "classnames";

import { ComponentTransitionProps } from "../types";
import { defaultTransitionDuration, defaultTransitionEasing } from "../animations/defaults";
import { TransitionState } from "./animation-hooks/types";
import {
    AnimationHook,
    useContainerRectangle,
    useExitAnimation,
    useContainerAnimation,
    useEnterAnimation,
} from "./animation-hooks";

interface Props extends ComponentTransitionProps {
    inViewRef?: (element: HTMLElement) => void;
}

export const Transition: React.FC<Props> = (props) => {

    const [transitionState, setTransitionState] = useState<TransitionState>(null);

    const { children, inViewRef, disabled } = props;

    const prevChildren = useRef<React.ReactNode>(props.animateOnMount ? null : children);
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

    useExitAnimation({
        ...animationHooks,
        prevClientRect: prevClientRect,
        settings: props.exitAnimation,
        onFinish: () => {
            const hadPrevChildren = !!prevChildren.current;
            prevChildren.current = children;
            if (hadPrevChildren && prevChildren.current) {
                props.onExitFinished && props.onExitFinished();
            }
            udpatedState(TransitionState.ContainerRect);
        },
    });

    useContainerAnimation({
        ...animationHooks,
        prevClientRect,
        nextClientRect,
        animateContainer: props.animateContainer,
        animateContainerDuration: props.animateContainerDuration,
        animateContainerEasing: props.animateContainerEasing,
        onFinish: () => {
            if (!prevChildren.current) {
                props.onExitFinished && props.onExitFinished();
            }
            udpatedState(TransitionState.Enter);
        },
    });

    useEnterAnimation({
        ...animationHooks,
        nextClientRect,
        settings: props.enterAnimation,
        onFinish: () => {
            if (prevChildren.current) {
                props.onEnterFinished && props.onEnterFinished();
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
                    props.className,
                    transitionState === TransitionState.Enter && props.classNameEnter,
                    transitionState === TransitionState.Exit && props.classNameExit,
                ) || null}
            style={{
                ...props.style,
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
