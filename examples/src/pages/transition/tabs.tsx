import React, { useState } from "react";

import { Box, BoxColor } from "../../components";
import { ComponentTransition, AnimationTypes } from "../../../../src";

enum Direction {
    Right,
    Left,
}

export const Tabs: React.FC = () => {
    const [selectedTab, setSelectedTab] = useState(1);
    const [direction, setDirection] = useState(Direction.Right);

    const onClick = (ev: React.MouseEvent<HTMLButtonElement>) => {
        const nextTab = Number(ev.currentTarget.value);

        setSelectedTab(nextTab);
        setDirection(nextTab < selectedTab ? Direction.Left : Direction.Right);
    };

    return (
        <div style={styles.container}>
            <ul style={styles.tabs}>
                <li style={selectedTab === 1 ? styles.tabSelected : styles.tabItem}>
                    <button type="button" value={1} onClick={onClick} style={styles.tabButton}>
                        Tab 1
                    </button>
                </li>
                <li style={selectedTab === 2 ? styles.tabSelected : styles.tabItem}>
                    <button type="button" value={2} onClick={onClick} style={styles.tabButton}>
                        Tab 2
                    </button>
                </li>
                <li style={selectedTab === 3 ? styles.tabSelected : styles.tabItem}>
                    <button type="button" value={3} onClick={onClick} style={styles.tabButton}>
                        Tab 3
                    </button>
                </li>
            </ul>
            <ComponentTransition
                enterAnimation={
                    direction === Direction.Left ?
                        AnimationTypes.slideLeft.enter :
                        AnimationTypes.slideRight.enter
                }
                exitAnimation={
                    direction === Direction.Left ?
                        AnimationTypes.slideRight.exit :
                        AnimationTypes.slideLeft.exit
                }
                animateContainer={true}
            >
                <Box key={selectedTab} color={colorsMap[selectedTab]}>
                    <div style={{
                        height: heights[selectedTab],
                    }} />
                </Box>
            </ComponentTransition>
        </div>
    );
};

const heights: {[index:number]: string} = {
    1: "80px",
    2: "120px",
    3: null,
};

const colorsMap: { [index: number]: BoxColor } = {
    1: BoxColor.blueRed,
    2: BoxColor.yellowGreen,
    3: BoxColor.grayCyan,
};

const tabItem: React.CSSProperties = {
    flex: 1,
    textAlign: "center",
};

const styles: { [index: string]: React.CSSProperties } = {
    container: {
        overflow: "hidden",
    },
    tabs: {
        display: "flex",
        padding: 0,
        margin: 0,
        listStyle: "none",
        backgroundColor: "lavender",
    },
    tabSelected: {
        backgroundColor: "deepskyblue",
        ...tabItem,
    },
    tabItem,
    tabButton: {
        width: "100%",
        border: 0,
        padding: "20px 0",
        backgroundColor: "transparent",
        cursor: "pointer",
    },
};
