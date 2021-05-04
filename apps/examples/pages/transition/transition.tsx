import React from "react";

import { MainContainer } from "../../components";

import { Tabs } from "./tabs";
import { Rotate } from "./rotate";

export const Transition: React.FC = () => {
    return (
        <>
            <MainContainer>
                <Tabs />
            </MainContainer>
            <MainContainer>
                <Rotate />
            </MainContainer>
        </>
    );
};
