import React, { useState } from "react";

import { Box } from "../../components";
import { Presets } from "../../../../src";

export const Fade: React.FC = () => {

    const [show, setShow] = useState(true);

    const onClick = () => {
        setShow(() => !show);
    };

    return (
        <div style={styles.container}>
            <div>
                <label htmlFor="show-check">Show</label>
                <input id="show-check" type="checkbox" checked={show} onChange={onClick} />
            </div>
            <div style={styles.content}>
                <Presets.TransitionFade>
                    {
                        show && <Box />
                    }
                </Presets.TransitionFade>
            </div>
        </div>
    );
};

const styles: { [index: string]: React.CSSProperties } = {
    container: {
        display: "flex",
    },
    content: {
        padding: "0 20px",
    },
};
