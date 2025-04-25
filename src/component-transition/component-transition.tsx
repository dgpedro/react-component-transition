import React, { PropsWithChildren, useContext } from "react";

import { ComponentTransitionContext } from "./context";
import { Transition, LazyTransition } from "../transition";
import { ComponentTransitionProps } from "../types";

export const ComponentTransition: React.FC<PropsWithChildren<ComponentTransitionProps>> = (props) => {

    const context = useContext(ComponentTransitionContext);

    const forceExit = context?.exitKeys.indexOf(context.contextId) > -1;
    const forceEnter = context?.enterKeys.indexOf(context.contextId) > -1;

    const { animateOnMount, children, lazy, onEnterFinished, onExitFinished } = props;

    const handleEnterFinished = () => {
        if (onEnterFinished) {
            onEnterFinished();
        }
        if (context?.contextId && context?.onEnterFinished) {
            context.onEnterFinished(context.contextId);
        }
    };

    const handleExitFinished = () => {
        if (onExitFinished) {
            onExitFinished();
        }
        if (context?.contextId && context?.onExitFinished) {
            context.onExitFinished(context.contextId);
        }
    };

    const Component = lazy ? LazyTransition : Transition;

    return (
        // Clear context for nested transitions
        <ComponentTransitionContext.Provider value={null}>
            <Component
                {...props}
                animateOnMount={forceEnter || animateOnMount}
                onEnterFinished={handleEnterFinished}
                onExitFinished={handleExitFinished}
            >
                {forceExit ? null : children}
            </Component>
        </ComponentTransitionContext.Provider>
    );
};

ComponentTransition.displayName = "ComponentTransition";
