import React from "react";
import { BrowserRouter, Redirect, Route, Switch } from "react-router-dom";

import { Navigator } from "./navigator";
import routes from "./routes";

import { ShowHide } from "./pages/show-hide";

export const App = () => {
    return (
        <BrowserRouter>
            <Navigator />
            <Switch>
                <Route path={routes.showHide.path}>
                    <ShowHide />
                </Route>
                <Route path={routes.simple.path}>
                    <div>Simple</div>
                </Route>
                <Redirect to={routes.showHide.path} />
            </Switch>
        </BrowserRouter>
    );
};
