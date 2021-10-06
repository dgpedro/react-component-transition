import React from "react";
import { BrowserRouter, Redirect, Route, Switch } from "react-router-dom";

import { Navigator } from "./navigator";
import routes from "./routes";

import { Hide } from "./pages/hide";

export const App = () => {
    return (
        <BrowserRouter>
            <Navigator />
            <Switch>
                <Route path={routes.hide.path}>
                    <Hide />
                </Route>
                <Route path={routes.transition.path}>
                    <div>Simple</div>
                </Route>
                <Redirect to={routes.hide.path} />
            </Switch>
        </BrowserRouter>
    );
};
