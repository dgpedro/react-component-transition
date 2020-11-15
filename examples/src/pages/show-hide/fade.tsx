import React, { useState } from "react";

import { Box } from "../../components";
import { TransitionFade } from "../../../../src/presets";

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
                <TransitionFade>
                    {
                        show && <Box />
                    }
                </TransitionFade>
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
