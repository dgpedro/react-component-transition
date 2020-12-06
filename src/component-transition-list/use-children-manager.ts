import React, { Key, PropsWithChildren, useRef } from "react";
import uniqid from "uniqid";

import { TransitionProps } from "../transition";

export interface ChildProps {
    children: React.ReactNode,
    childKey: Key;
    type: React.ComponentType<TransitionProps>,
    props: TransitionProps,
}

interface ChildMapper extends Record<string, ChildProps> { }

const invertMapper = (keysMapper: ChildMapper) => {
    const inverted: Record<string, string> = {};
    for (const key of Object.keys(keysMapper)) {
        if (keysMapper[key] !== null && keysMapper[key] !== undefined) {
            inverted[keysMapper[key].childKey] = key;
        }
    }

    return inverted;
};

export const useChildrenManager = (
    children: React.ReactElement<PropsWithChildren<TransitionProps>>[],
) => {

    const childrenMapper = useRef<ChildMapper>({});
    const internalKeys = useRef<string[]>([]);

    if (!children) {
        return {
            childrenMapper: childrenMapper.current,
            internalKeys: internalKeys.current,
            exitCounter: 0,
            removeChild: () => { },
        };
    }

    const inverted = invertMapper(childrenMapper.current);

    let internalKeysUpdated: string[] = [];
    const childrenKeysAssert: Record<Key, string> = {};
    const newChildrenIndexes: number[] = [];

    React.Children.forEach(children, (child, i) => {
        const childKey = child?.key;
        const childInternalKey = inverted[childKey];

        if (childrenKeysAssert[childKey]) {
            logError(`Detected duplicated key \`${childKey}\` in two children. Children keys should be unique.`);
            return;
        }

        if (childKey !== undefined && childKey !== null && childInternalKey === undefined) {
            const newKey = uniqid();
            internalKeysUpdated.push(newKey);
            childrenMapper.current[newKey] = getChildProps(child);
            childrenKeysAssert[childKey] = newKey;
            newChildrenIndexes.push(i);
        } else if (childInternalKey) {
            internalKeysUpdated.push(childInternalKey);
            childrenMapper.current[childInternalKey] = getChildProps(child);
            childrenKeysAssert[childKey] = childInternalKey;
        }
    });

    let exitCounter = 0;

    for (let i = 0; i < internalKeys.current.length; i++) {
        const exists = internalKeysUpdated.indexOf(internalKeys.current[i]) > -1;

        if (exists) {
            continue;
        }

        const accumulator = newChildrenIndexes.filter((newIndex) => newIndex <= i).length;
        const index = i + accumulator;

        internalKeysUpdated = [
            ...internalKeysUpdated.slice(0, index),
            internalKeys.current[i],
            ...internalKeysUpdated.slice(index)
        ];
        childrenMapper.current[internalKeys.current[i]].children = null;
        exitCounter++;
    }

    internalKeys.current = internalKeysUpdated;

    const removeChild = (internalKey: string) => {
        delete childrenMapper.current[internalKey];
        internalKeys.current = internalKeys.current.filter((key) => key !== internalKey);
    };

    return {
        childrenMapper: childrenMapper.current,
        internalKeys: internalKeys.current,
        exitCounter,
        removeChild,
    };
}

const getChildProps = (
    child: React.ReactElement<PropsWithChildren<TransitionProps>>
): ChildProps => {

    const { children, ...props } = child.props;

    return {
        children,
        childKey: child.key,
        type: child?.type as React.ComponentType<TransitionProps>,
        props,
    };
};

const logError = (message: string) => {
    if (process.env.NODE_ENV === "development") {
        console.error(message);
    }
};
