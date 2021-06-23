import React from "react";
import { useLocation, useHistory } from "react-router-dom";
import routes from "./routes";

export const Navigator = () => {
    const location = useLocation();
    const history = useHistory();

    const onChange = (ev: React.ChangeEvent<HTMLSelectElement>) => {
        history.push(ev.target.value);
    };

    return (
        <select onChange={onChange} value={location.pathname}>
            {
                Object.keys(routes).map((key) => {
                    const { name, path } = (routes as Record<string, { name: string, path: string }>)[key];
                    return (
                        <option
                            key={path}
                            value={path}
                        >
                            {name}
                        </option>
                    );
                })
            }
        </select>
    );
};
