import React, { PropsWithChildren } from "react";
import Media from 'react-media';

export const MainContainer: React.FC<PropsWithChildren<unknown>> = ({ children }) => {
    return (
        <Media query={{ maxWidth: 599 }}>
            {matches => (
                <main style={matches ? mobileStyles.main : styles.main}>
                    {children}
                </main>
            )}
        </Media>
    );
};

const styles: { [index: string]: React.CSSProperties } = {
    main: {
        backgroundColor: "#fff",
        padding: "50px 30px",
        borderRadius: "10px",
        boxShadow: "inset rgb(204, 204, 204) 0px 0px 5px 2px",
        margin: "20px 0",
        overflow: "hidden",
    },
};

const mobileStyles: { [index: string]: React.CSSProperties } = {
    main: {
        ...styles.main,
        padding: "20px 15px",
    },
};
