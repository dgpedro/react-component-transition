import React from "react";

import { TransitionProps, ComponentTransition } from "../index";
import * as AnimationTypes from "../animations";

export interface PresetProps extends TransitionProps { }

export const TransitionExpandVertical: React.FC<PresetProps> = (props) => (
    <ComponentTransition
        {...props}
        enterAnimation={AnimationTypes.expand.vertical}
        exitAnimation={AnimationTypes.collapse.vertical}
        style={{
            overflow: "hidden",
            ...props.style,
        }}
    >
        {props.children}
    </ComponentTransition>
);
TransitionExpandVertical.displayName = "TransitionExpandVertical";

export const TransitionExpandHorizontal: React.FC<PresetProps> = (props) => (
    <ComponentTransition
        {...props}
        enterAnimation={AnimationTypes.expand.horizontal}
        exitAnimation={AnimationTypes.collapse.horizontal}
        style={{
            overflow: "hidden",
            ...props.style,
        }}
    >
        {props.children}
    </ComponentTransition>
);
TransitionExpandVertical.displayName = "TransitionExpandHorizontal";

export const TransitionSlideUp: React.FC<PresetProps> = (props) => (
    <ComponentTransition
        animateContainer={true}
        {...props}
        enterAnimation={AnimationTypes.slideUp.enter}
        exitAnimation={AnimationTypes.slideUp.exit}
    >
        {props.children}
    </ComponentTransition>
);
TransitionExpandVertical.displayName = "TransitionSlideUp";

export const TransitionSlideDown: React.FC<PresetProps> = (props) => (
    <ComponentTransition
        animateContainer={true}
        {...props}
        enterAnimation={AnimationTypes.slideDown.enter}
        exitAnimation={AnimationTypes.slideDown.exit}
    >
        {props.children}
    </ComponentTransition>
);
TransitionExpandVertical.displayName = "TransitionSlideDown";

export const TransitionSlideLeft: React.FC<PresetProps> = (props) => (
    <ComponentTransition
        animateContainer={true}
        {...props}
        enterAnimation={AnimationTypes.slideLeft.enter}
        exitAnimation={AnimationTypes.slideLeft.exit}
    >
        {props.children}
    </ComponentTransition>
);
TransitionExpandVertical.displayName = "TransitionSlideLeft";

export const TransitionSlideRight: React.FC<PresetProps> = (props) => (
    <ComponentTransition
        animateContainer={true}
        {...props}
        enterAnimation={AnimationTypes.slideRight.enter}
        exitAnimation={AnimationTypes.slideRight.exit}
    >
        {props.children}
    </ComponentTransition>
);
TransitionExpandVertical.displayName = "TransitionSlideRight";

export const TransitionFade: React.FC<PresetProps> = (props) => (
    <ComponentTransition
        animateContainer={true}
        {...props}
        enterAnimation={AnimationTypes.fade.enter}
        exitAnimation={AnimationTypes.fade.exit}
    >
        {props.children}
    </ComponentTransition>
);
TransitionExpandVertical.displayName = "TransitionFade";

export const TransitionScale: React.FC<PresetProps> = (props) => (
    <ComponentTransition
        animateContainer={true}
        {...props}
        enterAnimation={AnimationTypes.scale.enter}
        exitAnimation={AnimationTypes.scale.exit}
    >
        {props.children}
    </ComponentTransition>
);
TransitionExpandVertical.displayName = "TransitionScale";

export const TransitionRotate: React.FC<PresetProps> = (props) => (
    <ComponentTransition
        animateContainer={true}
        {...props}
        enterAnimation={[AnimationTypes.rotate.enter, AnimationTypes.fade.enter]}
        exitAnimation={[AnimationTypes.rotate.exit, AnimationTypes.fade.exit]}
    >
        {props.children}
    </ComponentTransition>
);
TransitionExpandVertical.displayName = "TransitionRotate";

export const TransitionRotateX: React.FC<PresetProps> = (props) => (
    <ComponentTransition
        animateContainer={true}
        {...props}
        enterAnimation={AnimationTypes.rotateX.enter}
        exitAnimation={AnimationTypes.rotateX.exit}
    >
        {props.children}
    </ComponentTransition>
);
TransitionExpandVertical.displayName = "TransitionRotateX";

export const TransitionRotateY: React.FC<PresetProps> = (props) => (
    <ComponentTransition
        animateContainer={true}
        {...props}
        enterAnimation={AnimationTypes.rotateY.enter}
        exitAnimation={AnimationTypes.rotateY.exit}
    >
        {props.children}
    </ComponentTransition>
);
TransitionExpandVertical.displayName = "TransitionRotateY";
