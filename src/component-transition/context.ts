import { createContext } from "react";

export interface ComponentTransitionContextProps {
    contextId: string;
    onExitFinished: (contextId: string) => void;
    onEnterFinished: (contextId: string) => void;
    exitKeys: string[];
    enterKeys: string[];
}

export const ComponentTransitionContext = createContext<ComponentTransitionContextProps>(null);
