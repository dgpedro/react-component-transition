import { useState, useRef, useEffect, useLayoutEffect } from "react";

import { animateExit, animateEnter, animateContainer, finishAnimation, cancelAnimation } from "./animation";
import { didChildrenChanged } from "./did-children-changed";

import { AnimationSettingsProps, ContainerProps } from "../types";

interface TransitionArgs extends AnimationSettingsProps, ContainerProps {
    children: React.ReactNode;
    element: HTMLDivElement;
    onExitFinished: () => void;
}

export const useTransition = ({
    children,
    element,
    exitAnimation,
    enterAnimation,
    onExitFinished,
    animateContainerDuration,
    animateContainerEasing
}: TransitionArgs) => {
    const [transitionState, setTransitionState] = useState<"exit" | "container" | "enter">("exit");

    const previousChildren = useRef<React.ReactNode>(children);
    const animations = useRef<Animation[]>([]);
    const rectangle = useRef<ClientRect>(null);

    const isRunning = animations.current.length > 0;

    const hasChildrenChanged = didChildrenChanged(previousChildren.current, children);

    if (!hasChildrenChanged && !isRunning) {
        previousChildren.current = children;
    }

    useEffect(() => {
        return () => {
            cancelAnimation(animations.current);
        };
    }, []);

    useEffect(() => {
        if (hasChildrenChanged) {
            startTransition();
        }
    });

    useLayoutEffect(() => {
        if (transitionState === "container") {
            startContainerAnimation();
        }
        if (transitionState === "enter") {
            startEnterAnimation();
        }
    }, [transitionState]);

    const startTransition = async () => {
        if (isRunning) {
            return;
        }

        if (previousChildren.current) {
            animations.current = animateExit(element, element.getBoundingClientRect(), exitAnimation);
            await finishAnimation(animations.current);
        }

        previousChildren.current = children;

        onExitFinished();

        rectangle.current = element.getBoundingClientRect();
        setTransitionState("container");
    };

    const startContainerAnimation = async () => {
        // Cancel the fill: "forwards" set by animateExit
        cancelAnimation(animations.current);

        animations.current = [animateContainer(
            element,
            rectangle.current,
            element.getBoundingClientRect(),
            animateContainerDuration,
            animateContainerEasing,
        )];

        await finishAnimation(animations.current);
        setTransitionState("enter");
    };

    const startEnterAnimation = async () => {
        if (previousChildren.current) {
            animations.current = animateEnter(element, element.getBoundingClientRect(), enterAnimation);
            await finishAnimation(animations.current);
        }

        animations.current = [];
        setTransitionState("exit");
    };

    const childrenToRender = hasChildrenChanged || (transitionState === "exit" && isRunning) ? previousChildren.current : children;

    return {
        childrenToRender,
        transitionState,
    };
};
