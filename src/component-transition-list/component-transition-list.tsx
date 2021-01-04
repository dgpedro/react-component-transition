import React, { useState } from "react";

import { useChildrenManager } from "./use-children-manager";
import { TransitionContext, TransitionContextProps } from "../transition";

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
                    const context: TransitionContextProps = {
                        contextId: internalKey,
                        onExitFinished,
                        onEnterFinished,
                        enterKeys,
                        exitKeys,
                    };

                    return (
                        <TransitionContext.Provider key={internalKey} value={context}>
                            {childrenMapper[internalKey]}
                        </TransitionContext.Provider>
                    );
                })
            }
        </>
    );
};

ComponentTransitionList.displayName = "ComponentTransitionList";
