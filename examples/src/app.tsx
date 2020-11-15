import React from "react";
import { BrowserRouter, Switch, Route, useLocation, Redirect } from "react-router-dom";

import { ComponentTransition, AnimationTypes } from "../../src";

import { Menu } from "./menu";
import { ShowHide } from "./pages/show-hide";
import { Transition } from "./pages/transition";
import { List } from "./pages/list";

export const App: React.FC = () => (
    <BrowserRouter>
        <div style={styles.main}>
            <div style={styles.table}>
                <div style={styles.menu}>
                    <Menu />
                </div>
                <div style={styles.routes}>
                    <AppRoutes />
                </div>
            </div>
        </div>
    </BrowserRouter>
);

const AppRoutes: React.FC = () => {
    const location = useLocation();
    return (
        <ComponentTransition
            enterAnimation={AnimationTypes.slideUp.enter}
            exitAnimation={AnimationTypes.slideDown.exit}
            animateContainer={true}
        >
            <div key={location.key} style={styles.content}>
                <Switch location={location}>
                    <Route path="/show-hide" component={ShowHide} />
                    <Route path="/transition" component={Transition} />
                    <Route path="/list" component={List} />
                    <Redirect to='/show-hide' />
                </Switch>
            </div>
        </ComponentTransition>
    );
};

const styles: { [index: string]: React.CSSProperties } = {
    main: {
        display: "flex",
        height: "100%",
    },
    table: {
        display: "flex",
        width: "80%",
        margin: "auto",
        backgroundColor: "lavender",
        boxShadow: "grey 2px 2px 10px",
    },
    menu: {
        padding: "30px 50px",
    },
    routes: {
        overflow: "hidden",
        flexGrow: 1,
        alignSelf: "center",
        justifyContent: "center",
    },
    content: {
        padding: "10px 30px",
    }
};
