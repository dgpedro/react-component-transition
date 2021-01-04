import React, { Key, useEffect, useRef } from "react";
import uniqid from "uniqid";

import { ChildrenManagerOut, ChildrenMapper } from "./types";

/**
 * Returns a new object in the format {[key]: internalKey}.
 * @param keysMapper - The main internalKey/key mapper.
 */
const invertMapper = (keysMapper: ChildrenMapper) => {
    const inverted: Record<string, string> = {};
    for (const key of Object.keys(keysMapper)) {
        const childKey = keysMapper[key]?.key;
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
    
    const exitKeys = useRef<string[]>([]);
    const enterKeys = useRef<string[]>([]);

    const mounted = useRef(false);

    useEffect(() => {
        mounted.current = true;
    }, []);

    if (!children) {
        return {
            childrenMapper: childrenMapper.current,
            internalKeys: internalKeys.current,
            removeExit: () => 0,
            removeEnter: () => 0,
            exitKeys: [],
            enterKeys: [],
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
            childrenMapper.current[newKey] = child;
            childrenKeysAssert[childKey] = newKey;
            newChildrenIndexes.push(i);
            
            if (mounted.current) {
                enterKeys.current.push(newKey);
            }
        } else if (childInternalKey) {
            internalKeysUpdated.push(childInternalKey);
            childrenMapper.current[childInternalKey] = child;
            childrenKeysAssert[childKey] = childInternalKey;
        }
    });

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
        exitKeys.current.push(internalKeys.current[i]);
    }

    internalKeys.current = internalKeysUpdated;

    const removeExit = (internalKey: string) => {
        delete childrenMapper.current[internalKey];
        internalKeys.current = internalKeys.current.filter((key) => key !== internalKey);
        exitKeys.current = exitKeys.current.filter((key) => key !== internalKey);
        return exitKeys.current.length;
    };

    const removeEnter = (internalKey: string) => {
        enterKeys.current = enterKeys.current.filter((key) => key !== internalKey);
        return enterKeys.current.length;
    };

    return {
        childrenMapper: childrenMapper.current,
        internalKeys: internalKeys.current,
        removeExit,
        removeEnter,
        exitKeys: exitKeys.current,
        enterKeys: enterKeys.current,
    };
}

const logError = (message: string) => {
    if (process.env.NODE_ENV === "development") {
        console.error(message);
    }
};
