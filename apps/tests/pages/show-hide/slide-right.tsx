import React, { useState } from "react";

import { Presets } from "@src";
import { Box, BoxColor } from "@apps/shared/box";

export const SlideRight: React.FC = () => {
    const [show, setShow] = useState(true);

    const onCheck = () => {
        setShow((s) => !s);
    };

    return (
        <div id="show-hide_slide-right" style={{ width: "130px" }}>
            <input type="checkbox" id="show-hide_slide-right_check" onChange={onCheck} />
            <Presets.TransitionSlideRight duration={2000}>
                {show && <Box color={BoxColor.blueRed} />}
            </Presets.TransitionSlideRight>
        </div>
    );
};
