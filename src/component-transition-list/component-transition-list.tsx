import React, { useState } from "react";

import { useChildrenManager } from "./use-children-manager";
import { ComponentTransitionContext, ComponentTransitionContextProps } from "../component-transition";

interface TransitionListProps {
    children: React.ReactElement[];
}

export const ComponentTransitionList: React.FC<TransitionListProps> = ({
    children
}) => {
    const [, forceUpdate] = useState(0);

    const {
        childrenMapper,
        internalKeys,
        enterKeys,
        exitKeys,
        removeExit,
        removeEnter,
    } =
        useChildrenManager(children as React.ReactElement[]);

    const onExitFinished = (internalKey: string) => {
        const remaining = removeExit(internalKey);

        if (remaining === 0) {
            forceUpdate((counter) => counter + 1);
        }
    };

    const onEnterFinished = (internalKey: string) => {
        removeEnter(internalKey);
    };

    return (
        <>
            {
                internalKeys.map((internalKey) => {
                    const context: ComponentTransitionContextProps = {
                        contextId: internalKey,
                        onExitFinished,
                        onEnterFinished,
                        enterKeys,
                        exitKeys,
                    };

                    return (
                        <ComponentTransitionContext.Provider key={internalKey} value={context}>
                            {childrenMapper[internalKey]}
                        </ComponentTransitionContext.Provider>
                    );
                })
            }
        </>
    );
};

ComponentTransitionList.displayName = "ComponentTransitionList";
