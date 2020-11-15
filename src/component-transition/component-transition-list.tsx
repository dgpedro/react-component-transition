import React, { useState, useRef, Key, ReactText, useEffect, PropsWithChildren } from "react";
import uniqid from "uniqid";

import { TransitionProps } from "../types";

interface ITransitionList {
    children: React.ReactElement<TransitionProps>[];
}

interface IInternalKeysMap {
    [index: string]: Key;
}

interface IChildrenMapper {
    [index: string]: {
        children: React.ReactNode,
        type: React.ComponentType<TransitionProps>,
        props: TransitionProps,
    };
}

export const ComponentTransitionList: React.FC<ITransitionList> = (props) => {
    const { children } = props;

    const [counter, setCounter] = useState(0);
    const keysMapper = useRef<IInternalKeysMap>({});
    const childrenMapper = useRef<IChildrenMapper>({});
    const keys = useRef<string[]>([]);
    const exitCount = useRef(0);
    const mounted = useRef(false);

    useEffect(() => {
        mounted.current = true;
    }, [])

    if (children) {
        const updatedState =
            updateAndSortChildren(
                keysMapper.current,
                childrenMapper.current,
                keys.current,
                children as React.ReactElement<PropsWithChildren<TransitionProps>>[],
            );

        keysMapper.current = updatedState.keysMapperUpdated;
        childrenMapper.current = updatedState.childrenMapperUpdated;
        keys.current = updatedState.internalKeysList;
        exitCount.current = updatedState.exitCount;
    }

    const onExitFinished = (internalKey: string, onExitFinishedCallback: () => void) => {

        const propsCallback = () => {
            onExitFinishedCallback && onExitFinishedCallback();
        };

        if (keysMapper.current[internalKey] !== null) {
            propsCallback();
            return;
        }

        exitCount.current--;

        delete keysMapper.current[internalKey];
        delete childrenMapper.current[internalKey];
        keys.current = keys.current.filter((key) => key !== internalKey);

        if (exitCount.current === 0) {
            setCounter(() => counter + 1);
        }

        propsCallback();
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
                            onExitFinished: onExitFinished.bind(null, internalKey, props?.onExitFinished),
                        },
                        children,
                    );
                })
            }
        </>
    );
};

const invertMapper = (keysMapper: IInternalKeysMap) => {
    const inverted: { [index: string]: string } = {};
    for (const key of Object.keys(keysMapper)) {
        if (keysMapper[key] !== null && keysMapper[key] !== undefined) {
            inverted[keysMapper[key]] = key;
        }
    }

    return inverted;
};

const updateAndSortChildren = (
    keysMapper: IInternalKeysMap,
    childrenMapper: IChildrenMapper,
    internalKeys: string[],
    children: React.ReactElement<PropsWithChildren<TransitionProps>>[],
) => {
    const inverted = invertMapper(keysMapper);
    const keysMapperUpdated = { ...keysMapper };
    const childrenMapperUpdated = { ...childrenMapper };

    let internalKeysList: string[] = [];
    const childrenKeysAssert: ReactText[] = [];

    for (const child of children) {
        const childKey = child?.key;
        const childInternalKey = inverted[childKey];

        if (childrenKeysAssert.indexOf(childKey) > -1) {
            logError(`Detected duplicated key \`${childKey}\` in two children. Children keys should be unique.`);
            continue;
        }

        if (childKey !== undefined && childKey !== null && childInternalKey === undefined) {
            const newKey = uniqid();
            internalKeysList.push(newKey);
            keysMapperUpdated[newKey] = childKey;
            childrenMapperUpdated[newKey] = getChildrenMapped(child);
            childrenKeysAssert.push(childKey);
        } else if (childInternalKey) {
            internalKeysList.push(childInternalKey);
            childrenMapperUpdated[childInternalKey] = getChildrenMapped(child);
            childrenKeysAssert.push(childKey);
        }
    }

    let exitCount = 0;

    for (let i = 0; i < internalKeys.length; i++) {
        const exists = children.filter((child) => child.key === keysMapper[internalKeys[i]]).length > 0;

        if (!exists) {
            internalKeysList = [...internalKeysList.slice(0, i), internalKeys[i], ...internalKeysList.slice(i)];
            keysMapperUpdated[internalKeys[i]] = null;
            childrenMapperUpdated[internalKeys[i]].children = null;
            exitCount++;
        }
    }
    return {
        keysMapperUpdated,
        childrenMapperUpdated,
        internalKeysList,
        exitCount,
    };
}

const getChildrenMapped = (child: React.ReactElement<PropsWithChildren<TransitionProps>>) => {

    const { children, ...props } = child.props;

    return {
        children,
        type: child?.type as React.ComponentType<TransitionProps>,
        props,
    };
};

const logError = (message: string) => {
    if (process.env.NODE_ENV === "development") {
        console.error(message);
    }
};

ComponentTransitionList.displayName = "ComponentTransitionList";
