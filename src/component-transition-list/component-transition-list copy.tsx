import React, { useState, useRef, useEffect, PropsWithChildren } from "react";

import { ChildMapper, useTransformChildren } from "./use-transform-children";
import { TransitionProps } from "../transition";

interface TransitionListProps {
    children: React.ReactElement<TransitionProps>[];
}

// interface IInternalKeysMap {
//     [index: string]: Key;
// }

// interface IChildrenMapper {
//     [index: string]: {
//         children: React.ReactNode,
//         type: React.ComponentType<TransitionProps>,
//         props: TransitionProps,
//     };
// }

export const ComponentTransitionList: React.FC<TransitionListProps> = (props) => {
    const { children } = props;

    const [, setCounter] = useState(0);
    // const keysMapper = useRef<IInternalKeysMap>({});
    const childrenMapper = useRef<ChildMapper>({});
    const keys = useRef<string[]>([]);
    const exitCounter = useRef(0);
    const mounted = useRef(false);

    useEffect(() => {
        mounted.current = true;
    }, [])

    const updatedState =
        useTransformChildren(
            // keysMapper.current,
            childrenMapper.current,
            keys.current,
            children as React.ReactElement<PropsWithChildren<TransitionProps>>[],
        );

    // keysMapper.current = updatedState.keysMapperUpdated;
    childrenMapper.current = updatedState.childrenMapperUpdated;
    keys.current = updatedState.internalKeysList;
    exitCounter.current = updatedState.exitCount;

    const onExitFinished = (internalKey: string) => {
        // if (keysMapper.current[internalKey] !== null) {
        //     return;
        // }

        if (childrenMapper.current[internalKey]?.children) {
            return;
        }

        exitCounter.current--;

        // delete keysMapper.current[internalKey];
        delete childrenMapper.current[internalKey];
        keys.current = keys.current.filter((key) => key !== internalKey);

        if (exitCounter.current === 0) {
            setCounter((counterState) => counterState + 1);
        }
    };

    return (
        <>
            {
                keys.current.map((internalKey) => {
                    const { props, type, children } = childrenMapper.current[internalKey];

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
