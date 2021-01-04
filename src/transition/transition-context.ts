import { createContext } from "react";

export interface TransitionContextProps {
    contextId: string;
    onExitFinished: (contextId: string) => void;
    onEnterFinished: (contextId: string) => void;
    exitKeys: string[];
    enterKeys: string[];
}

export const TransitionContext = createContext<TransitionContextProps>(null);
