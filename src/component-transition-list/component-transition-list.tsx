import React, { useState, useRef, useEffect, PropsWithChildren } from "react";

import { useChildrenManager } from "./use-children-manager";
import { TransitionProps } from "../transition";

interface TransitionListProps {
    children: React.ReactElement<TransitionProps>[];
}

export const ComponentTransitionList: React.FC<TransitionListProps> = (props) => {
    const { children } = props;

    const [, setCounter] = useState(0);
    const mounted = useRef(false);

    useEffect(() => {
        mounted.current = true;
    }, [])

    const {
        childrenMapper,
        exitCounter,
        internalKeys,
        removeChild,
    } =
        useChildrenManager(
            children as React.ReactElement<PropsWithChildren<TransitionProps>>[],
        );

    const onExitFinished = (internalKey: string) => {

        removeChild(internalKey);

        if (exitCounter === 0) {
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
                            onExitFinishedListCallback: onExitFinished,
                            listId: internalKey,
                        },
                        children,
                    );
                })
            }
        </>
    );
};

ComponentTransitionList.displayName = "ComponentTransitionList";
