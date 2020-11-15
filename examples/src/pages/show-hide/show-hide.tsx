import React from "react";

import { MainContainer } from "../../components";

import { Fade } from "./fade";
import { SlideUp } from "./slide-up";

export const ShowHide: React.FC = () => {
    return (
        <>
            <MainContainer>
                <Fade />
            </MainContainer>
            <MainContainer>
                <SlideUp />
            </MainContainer>
        </>
    );
};
