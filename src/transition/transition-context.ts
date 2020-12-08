import { createContext } from "react";

export interface TransitionContextProps {
    contextId: string;
    onExitFinished: (contextId: string) => void;
    shouldEnter: boolean;
    shouldExit: boolean;
}

export const TransitionContext = createContext<TransitionContextProps>(null);
