import React, { useState } from "react";

import { Box, BoxColor } from "../../components";
import { TransitionRotateX } from "../../../../src/presets";

export const Rotate: React.FC = () => {
    const [showDetails, setShowDetails] = useState(false);

    const onClick = () => {
        setShowDetails(!showDetails);
    };

    return (
        <div style={styles.container}>
            <TransitionRotateX>
                {showDetails ? <Back onClick={onClick} /> : <Front onClick={onClick} />}
            </TransitionRotateX>
        </div>
    );
};

const Front = ({ onClick }: { onClick: () => void }) =>
    <>
        <Box color={BoxColor.grayCyan}>Front</Box>
        <button type="button" onClick={onClick} style={styles.options}>more</button>
    </>;

const Back = ({ onClick }: { onClick: () => void }) =>
    <>
        <Box color={BoxColor.blueRed}>Back</Box>
        <button type="button" onClick={onClick} style={styles.options}>less</button>
    </>;

const styles: { [index: string]: React.CSSProperties } = {
    container: {
        textAlign: "center",
        width: "165px",
        margin: "0 auto",
        position: "relative",
    },
    options: {
        position: "absolute",
        bottom: "5px",
        right: "5px",
        fontWeight: "bold",
        color: "darkgreen",
        fontSize: "smaller",
        backgroundColor: "white",
        border: "1px darkgreen solid",
        borderRadius: "25%",
        cursor: "pointer",
    },
}
