import React from "react";

import { MainContainer } from "../../components";
import { List as ListSimple } from "./simple";
import { List as ListCustom } from "./custom";

export const List = () => {
    return (
        <>
            <MainContainer>
                <ListSimple />
            </MainContainer>
            <MainContainer>
                <ListCustom />
            </MainContainer>
        </>
    );
};
