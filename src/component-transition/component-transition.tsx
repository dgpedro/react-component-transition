import React from "react";

import { Transition } from "./transition";
import { LazyTransition } from "./lazy-transition";
import { ComponentTransitionProps } from "../types";

export const ComponentTransition: React.FC<ComponentTransitionProps> = (props) => {

    const { lazy } = props;

    if (lazy) {
        return <LazyTransition {...props} />
    }

    return <Transition {...props} />;
};

ComponentTransition.displayName = "ComponentTransition";
