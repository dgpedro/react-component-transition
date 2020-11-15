export enum TransitionState {
    Exit = "exit",
    Container = "container",
    Enter = "enter",
    ContainerRect = "container-rect",
}

export interface AnimationHook {
    children: React.ReactNode;
    prevChildren: React.ReactNode;
    transitionState: TransitionState;
    onFinish: () => void;
    element: HTMLElement;
    disabled: boolean;
}
