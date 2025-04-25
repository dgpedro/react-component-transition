import React, { PropsWithChildren } from "react";

import { TransitionProps, ComponentTransition, AnimationSettings } from "../index";
import * as AnimationTypes from "../animations";

export interface PresetProps extends TransitionProps {
    duration?: number;
}

const getAnimations = (
    enterAnimation: AnimationSettings,
    exitAnimation: AnimationSettings,
    { duration }: PresetProps
) => {
    const enterDuration = duration || enterAnimation.options.duration;
    const exitDuration = duration || exitAnimation.options.duration;
    return {
        enterAnimation: { ...enterAnimation, options: { ...enterAnimation.options, duration: enterDuration } },
        exitAnimation: { ...exitAnimation, options: { ...exitAnimation.options, duration: exitDuration } },
    };
};

export const TransitionExpandVertical: React.FC<PropsWithChildren<PresetProps>> = (props) => (
    <ComponentTransition
        {...props}
        {...getAnimations(AnimationTypes.expand.vertical, AnimationTypes.collapse.vertical, props)}
        style={{
            overflow: "hidden",
            ...props.style,
        }}
    >
        {props.children}
    </ComponentTransition>
);
TransitionExpandVertical.displayName = "TransitionExpandVertical";

export const TransitionExpandHorizontal: React.FC<PropsWithChildren<PresetProps>> = (props) => (
    <ComponentTransition
        {...props}
        {...getAnimations(AnimationTypes.expand.horizontal, AnimationTypes.collapse.horizontal, props)}
        style={{
            overflow: "hidden",
            ...props.style,
        }}
    >
        {props.children}
    </ComponentTransition>
);
TransitionExpandVertical.displayName = "TransitionExpandHorizontal";

export const TransitionSlideUp: React.FC<PropsWithChildren<PresetProps>> = (props) => (
    <ComponentTransition
        animateContainer={true}
        {...props}
        {...getAnimations(AnimationTypes.slideUp.enter, AnimationTypes.slideUp.exit, props)}
    >
        {props.children}
    </ComponentTransition>
);
TransitionExpandVertical.displayName = "TransitionSlideUp";

export const TransitionSlideDown: React.FC<PropsWithChildren<PresetProps>> = (props) => (
    <ComponentTransition
        animateContainer={true}
        {...props}
        {...getAnimations(AnimationTypes.slideDown.enter, AnimationTypes.slideDown.exit, props)}
    >
        {props.children}
    </ComponentTransition>
);
TransitionExpandVertical.displayName = "TransitionSlideDown";

export const TransitionSlideLeft: React.FC<PropsWithChildren<PresetProps>> = (props) => (
    <ComponentTransition
        animateContainer={true}
        {...props}
        {...getAnimations(AnimationTypes.slideLeft.enter, AnimationTypes.slideLeft.exit, props)}
    >
        {props.children}
    </ComponentTransition>
);
TransitionExpandVertical.displayName = "TransitionSlideLeft";

export const TransitionSlideRight: React.FC<PropsWithChildren<PresetProps>> = (props) => (
    <ComponentTransition
        animateContainer={true}
        {...props}
        {...getAnimations(AnimationTypes.slideRight.enter, AnimationTypes.slideRight.exit, props)}
    >
        {props.children}
    </ComponentTransition>
);
TransitionExpandVertical.displayName = "TransitionSlideRight";

export const TransitionFade: React.FC<PropsWithChildren<PresetProps>> = (props) => (
    <ComponentTransition
        animateContainer={true}
        {...props}
        {...getAnimations(AnimationTypes.fade.enter, AnimationTypes.fade.exit, props)}
    >
        {props.children}
    </ComponentTransition>
);
TransitionExpandVertical.displayName = "TransitionFade";

export const TransitionScale: React.FC<PropsWithChildren<PresetProps>> = (props) => (
    <ComponentTransition
        animateContainer={true}
        {...props}
        {...getAnimations(AnimationTypes.scale.enter, AnimationTypes.scale.exit, props)}
    >
        {props.children}
    </ComponentTransition>
);
TransitionExpandVertical.displayName = "TransitionScale";

export const TransitionRotate: React.FC<PropsWithChildren<PresetProps>> = (props) => {
    const rotate = getAnimations(AnimationTypes.rotate.enter, AnimationTypes.rotate.exit, props);
    const fade = getAnimations(AnimationTypes.fade.enter, AnimationTypes.fade.exit, props);
    return (
        <ComponentTransition
            animateContainer={true}
            {...props}
            enterAnimation={[rotate.enterAnimation, fade.enterAnimation]}
            exitAnimation={[rotate.exitAnimation, fade.exitAnimation]}
        >
            {props.children}
        </ComponentTransition>
    )
};
TransitionExpandVertical.displayName = "TransitionRotate";

export const TransitionRotateX: React.FC<PropsWithChildren<PresetProps>> = (props) => (
    <ComponentTransition
        animateContainer={true}
        {...props}
        {...getAnimations(AnimationTypes.rotateX.enter, AnimationTypes.rotateX.exit, props)}
    >
        {props.children}
    </ComponentTransition>
);
TransitionExpandVertical.displayName = "TransitionRotateX";

export const TransitionRotateY: React.FC<PropsWithChildren<PresetProps>> = (props) => (
    <ComponentTransition
        animateContainer={true}
        {...props}
        {...getAnimations(AnimationTypes.rotateY.enter, AnimationTypes.rotateY.exit, props)}
    >
        {props.children}
    </ComponentTransition>
);
TransitionExpandVertical.displayName = "TransitionRotateY";
