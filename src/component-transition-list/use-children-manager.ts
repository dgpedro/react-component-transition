import React, { Key, useRef } from "react";
import uniqid from "uniqid";

import { ChildrenManagerOut, ChildrenMapper, TransitionChildren } from "./types";

/**
 * Returns a new object in the format {[key]: internalKey}.
 * @param keysMapper - The main internalKey/key mapper.
 */
const invertMapper = (keysMapper: ChildrenMapper) => {
    const inverted: Record<string, string> = {};
    for (const key of Object.keys(keysMapper)) {
        const childKey = keysMapper[key]?.children?.key;
        if (childKey) {
            inverted[childKey] = key;
        }
    }

    return inverted;
};

/**
 * Returns a 'ChildrenManagerOut' depending on the current children.
 * @param children - The current children.
 */
export const useChildrenManager = (
    children: React.ReactElement[],
): ChildrenManagerOut => {

    const childrenMapper = useRef<ChildrenMapper>({});
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
            childrenMapper.current[newKey] = getTransitionChildren(child, true);
            childrenKeysAssert[childKey] = newKey;
            newChildrenIndexes.push(i);
        } else if (childInternalKey) {
            internalKeysUpdated.push(childInternalKey);
            childrenMapper.current[childInternalKey] = getTransitionChildren(child);
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
        childrenMapper.current[internalKeys.current[i]].shouldExit = true;
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

const getTransitionChildren = (child: React.ReactElement, isNew = false): TransitionChildren => (
    {
        children: child,
        shouldEnter: isNew,
        shouldExit: false,
    }
);

const logError = (message: string) => {
    if (process.env.NODE_ENV === "development") {
        console.error(message);
    }
};
