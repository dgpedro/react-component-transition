import React from "react";
import { BrowserRouter, Navigate, Route, Routes, useLocation } from "react-router-dom";
import Media from 'react-media';

import { ComponentTransition, AnimationTypes } from "../../src";

import { Menu } from "./menu";
import { ShowHide } from "./pages/show-hide";
import { Transition } from "./pages/transition";
import { List } from "./pages/list";

export const App = () => {
    return (
        <BrowserRouter basename="react-component-transition">
            <Media query="(min-width: 600px)" render={() => <AppDesktop />} />
            <Media query="(max-width: 599px)" render={() => <AppMobile />} />
        </BrowserRouter>
    );
};

export const AppDesktop: React.FC = () => (
    <div style={styles.app}>
        <div style={styles.main}>
            <Menu />
            <div style={styles.mainPanel}>
                <AppRoutes isMobile={false} />
            </div>
        </div>
    </div>
);

export const AppMobile: React.FC = () => (
    <div style={stylesMobile.app}>
        <div style={stylesMobile.main}>
            <Menu />
            <div style={stylesMobile.mainPanel}>
                <AppRoutes isMobile={true} />
            </div>
        </div>
    </div>
);

const AppRoutes: React.FC<{ isMobile: boolean }> = ({ isMobile }) => {
    const location = useLocation();
    return (
        <ComponentTransition
            enterAnimation={isMobile ? AnimationTypes.slideLeft.enter : AnimationTypes.slideUp.enter}
            exitAnimation={isMobile ? AnimationTypes.slideRight.exit : AnimationTypes.slideDown.exit}
            animateContainer={true}
        >
            <div key={location.key} style={isMobile ? stylesMobile.content : styles.content}>
                <Routes location={location}>
                    <Route path="/show-hide" element={<ShowHide />} />
                    <Route path="/transition" element={<Transition />} />
                    <Route path="/list" element={<List />} />
                    <Route path="*" element={<Navigate to='/show-hide' replace />} />
                </Routes>
            </div>
        </ComponentTransition>
    );
};

const styles: { [index: string]: React.CSSProperties } = {
    app: {
        padding: "20px",
    },
    main: {
        display: "flex",
        width: "80%",
        margin: "auto",
    },
    content: {
        padding: "10px 30px",
    },
    mainPanel: {
        overflow: "hidden",
        flexGrow: 1,
        backgroundColor: "lavender",
        boxShadow: "grey -2px 2px 10px",
    },
}

const stylesMobile: { [index: string]: React.CSSProperties } = {
    ...styles,
    app: {
        ...styles.app,
        padding: "20px 0",
    },
    main: {
        ...styles.main,
        flexDirection: "column",
        width: "100%",
    },
    content: {
        ...styles.content,
        padding: "10px",
    },
    mainPanel: {
        ...styles.mainPanel,
        width: "100%",
    },
};
