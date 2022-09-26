import { CSSProperties } from "react";
import { IntersectionOptions } from "react-intersection-observer";

export interface AnimationSettings {
    keyframes?: Keyframe[] | PropertyIndexedKeyframes;
    options?: KeyframeAnimationOptions;
}

export enum Variable {
    Width = "%WIDTH%",
    Height = "%HEIGHT%",
    Top = "%TOP%",
    Bottom = "%BOTTOM%",
    Left = "%LEFT%",
    Right = "%RIGHT%",
}

export interface ContainerProps {
    animateContainer?: boolean;
    animateContainerDuration?: number;
    animateContainerEasing?: string;
}

export interface StyleProps {
    style?: CSSProperties;
    className?: string;
    classNameEnter?: string;
    classNameExit?: string;
}

export interface HandlerProps {
    onExitFinished?: () => void;
    onEnterFinished?: () => void;
}

export interface TransitionProps extends ContainerProps, StyleProps, HandlerProps {
    animateOnMount?: boolean;
    disabled?: boolean;
    lazy?: boolean;
    lazyOptions?: IntersectionOptions;
}

export type AnimationSettingsProp = AnimationSettings | AnimationSettings[];

export interface AnimationSettingsProps {
    exitAnimation?: AnimationSettingsProp;
    enterAnimation?: AnimationSettingsProp;
}

export interface ComponentTransitionProps extends TransitionProps, AnimationSettingsProps {}
