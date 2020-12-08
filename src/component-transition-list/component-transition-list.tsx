import React, { useState, useRef, useEffect } from "react";

import { useChildrenManager } from "./use-children-manager";
import { TransitionContext, TransitionContextProps } from "../transition";

interface TransitionListProps {
    children: React.ReactElement[];
}

export const ComponentTransitionList: React.FC<TransitionListProps> = ({
    children
}) => {
    const [, setCounter] = useState(0);

    const exitCounter = useRef(0);
    const mounted = useRef(false);

    useEffect(() => {
        mounted.current = true;
    }, [])

    const {
        childrenMapper,
        internalKeys,
        exitCounter: exiting,
        removeChild,
    } =
        useChildrenManager(children as React.ReactElement[]);

    exitCounter.current = exiting;

    const onExitFinished = (internalKey: string) => {
        if (!childrenMapper[internalKey]?.shouldExit) {
            return;
        }

        removeChild(internalKey);
        exitCounter.current--;

        if (exitCounter.current === 0) {
            setCounter((counterState) => counterState + 1);
        }
    };

    return (
        <>
            {
                internalKeys.map((internalKey) => {
                    const { children, shouldEnter, shouldExit } = childrenMapper[internalKey];

                    const context: TransitionContextProps = {
                        contextId: internalKey,
                        onExitFinished,
                        shouldEnter: mounted.current && shouldEnter,
                        shouldExit,
                    };

                    return (
                        <TransitionContext.Provider key={internalKey} value={context}>
                            {children}
                        </TransitionContext.Provider>
                    );
                })
            }
        </>
    );
};

ComponentTransitionList.displayName = "ComponentTransitionList";
