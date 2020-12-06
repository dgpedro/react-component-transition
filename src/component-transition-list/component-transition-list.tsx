import React, { useState, useRef, useEffect, PropsWithChildren } from "react";

import { useChildrenManager } from "./use-children-manager";
import { TransitionProps } from "../transition";

interface TransitionListProps {
    children: React.ReactElement<TransitionProps>[];
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
        useChildrenManager(
            children as React.ReactElement<PropsWithChildren<TransitionProps>>[],
        );

    exitCounter.current = exiting;

    const onExitFinished = (internalKey: string) => {
        if (childrenMapper[internalKey]?.children) {
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
                    const { props, type, children } = childrenMapper[internalKey];

                    return React.createElement(
                        type,
                        {
                            ...props,
                            key: internalKey,
                            animateOnMount: mounted.current || props?.animateOnMount,
                            __INTERNAL_onExitFinishedListCallback__: onExitFinished,
                            __INTERNAL_listId__: internalKey,
                        },
                        children,
                    );
                })
            }
        </>
    );
};

ComponentTransitionList.displayName = "ComponentTransitionList";
