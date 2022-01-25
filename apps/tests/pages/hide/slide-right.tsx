import React, { useState } from "react";

import { Presets } from "@src";
import { Box, BoxColor } from "@apps/shared/box";

export const SlideRight: React.FC = () => {
    const [show, setShow] = useState(true);

    const onCheck = () => {
        setShow((s) => !s);
    };

    return (
        <div id="slide-right" style={{ width: "200px" }}>
            <input type="checkbox" id="slide-right-check" onChange={onCheck} checked={show} />
            <Presets.TransitionSlideRight duration={1000}>
                {show && <Box id="slide-right-box" color={BoxColor.blueRed} />}
                {/* {show && <div id="slide-right-box">Some text</div>} */}
            </Presets.TransitionSlideRight>
        </div>
    );
};
