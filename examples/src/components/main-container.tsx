import React from "react";

export const MainContainer: React.FC = ({children}) => {
    return (
        <main style={mainStyles.main}>
            {children}
        </main>
    );
};

const mainStyles: {[index: string]: React.CSSProperties} = {
    main: {
        backgroundColor: "#fff",
        padding: "50px 30px",
        borderRadius: "10px",
        boxShadow: "0 -5px 5px #ccc",
        margin: "20px 0",
        overflow: "hidden",
    },
};
