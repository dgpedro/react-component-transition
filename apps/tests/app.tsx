import React from "react";
import { BrowserRouter, Redirect, Route, Switch } from "react-router-dom";

import { Navigator } from "./navigator";
import routes from "./routes";

export const App = () => {
    return (
        <BrowserRouter>
            <Navigator />
            <Switch>
                <Route path={routes.toNull.path}>
                    <div>To null</div>
                </Route>
                <Route path={routes.simple.path}>
                    <div>Simple</div>
                </Route>
                <Redirect to={routes.toNull.path} />
            </Switch>
        </BrowserRouter>
    );
};
