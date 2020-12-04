import React, { Key, PropsWithChildren } from "react";
import uniqid from "uniqid";

import { TransitionProps } from "../transition";

export interface ChildProps {
    children: React.ReactNode,
    childKey: Key;
    type: React.ComponentType<TransitionProps>,
    props: TransitionProps,
}

export interface ChildMapper {
    [index: string]: ChildProps;
}

const invertMapper = (keysMapper: ChildMapper) => {
    const inverted: { [index: string]: string } = {};
    for (const key of Object.keys(keysMapper)) {
        if (keysMapper[key] !== null && keysMapper[key] !== undefined) {
            inverted[keysMapper[key].childKey] = key;
        }
    }

    return inverted;
};

export const useTransformChildren = (
    childrenMapper: ChildMapper,
    internalKeys: string[],
    children: React.ReactElement<PropsWithChildren<TransitionProps>>[],
) => {

    if (!children) {
        return {
            childrenMapperUpdated: childrenMapper,
            internalKeysList: internalKeys,
            exitCount: 0,
        };
    }

    const inverted = invertMapper(childrenMapper);
    const childrenMapperUpdated = { ...childrenMapper };

    let internalKeysList: string[] = [];
    const childrenKeysAssert: Record<Key, string> = {};

    for (const child of children) {
        const childKey = child?.key;
        const childInternalKey = inverted[childKey];

        if (childrenKeysAssert[childKey]) {
            logError(`Detected duplicated key \`${childKey}\` in two children. Children keys should be unique.`);
            continue;
        }

        if (childKey !== undefined && childKey !== null && childInternalKey === undefined) {
            const newKey = uniqid();
            internalKeysList.push(newKey);
            childrenMapperUpdated[newKey] = getChildProps(child);
            childrenKeysAssert[childKey] = newKey;
        } else if (childInternalKey) {
            internalKeysList.push(childInternalKey);
            childrenMapperUpdated[childInternalKey] = getChildProps(child);
            childrenKeysAssert[childKey] = childInternalKey;
        }
    }

    let exitCounter = 0;

    for (let i = 0; i < internalKeys.length; i++) {
        const exists = internalKeysList.indexOf(internalKeys[i]) > -1;

        if (!exists) {
            internalKeysList = [...internalKeysList.slice(0, i), internalKeys[i], ...internalKeysList.slice(i)];
            childrenMapperUpdated[internalKeys[i]].children = null;
            exitCounter++;
        }
    }
    return {
        childrenMapperUpdated,
        internalKeysList,
        exitCount: exitCounter,
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
