import React, { useState } from "react";

import { Presets } from "@src";

export const SlideRight: React.FC = () => {
    const [show, setShow] = useState(true);

    const onCheck = () => {
        setShow((s) => !s);
    };

    return (
        <div>
            <input type="checkbox" onChange={onCheck} />
            <Presets.TransitionSlideRight>
                {show && <div>Show Hide</div>}
            </Presets.TransitionSlideRight>
        </div>
    );
};
