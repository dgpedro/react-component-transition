import React, { useCallback, useState } from "react";
import uniqid from "uniqid";

import { BoxColor } from "../../../components";
import { ComponentTransitionList } from "@src";
import { ListItem } from "./list-item";

interface State {
    id: string;
    color: BoxColor;
}

export const List = () => {
    const [items, setItems] = useState<State[]>([
        newItem(),
        newItem(),
        newItem(),
    ]);

    const add = useCallback((index: number) => {
        setItems((list) =>
            [...list.slice(0, index + 1), newItem(), ...list.slice(index + 1)]);
    }, []);

    const remove = useCallback((index: number) => {
        setItems((list) => {
            if (list.length <= 1) {
                return list;
            }
            return list.filter((_, i) => i !== index);
        });
    }, []);

    return (
        <div style={styles.list}>
            <ComponentTransitionList>
                {items.map(({ id, color }, index) => (
                    <ListItem
                        key={id}
                        index={index}
                        onAdd={add}
                        onRemove={remove}
                        color={color}
                        canRemove={items.length > 1}
                    />
                ))}
            </ComponentTransitionList>
        </div>
    );
};

const newItem = (id = uniqid()) => ({ id, color: randomColor() });

const randomColor = () => colorsMap[randomInt(0, 4)];

const randomInt = (min: number, max: number) => {
    return min + Math.floor(((max + 1) - min) * Math.random());
}

const colorsMap: { [index: number]: BoxColor } = {
    0: BoxColor.blueRed,
    1: BoxColor.yellowGreen,
    2: BoxColor.grayCyan,
    3: BoxColor.cyanGray,
    4: BoxColor.beigeBlue,
};

const styles: { [index: string]: React.CSSProperties } = {
    list: {
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
    },
};
