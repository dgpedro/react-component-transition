export const didChildrenChanged = (prevChildren: React.ReactNode, children: React.ReactNode) => {
    const prevChildrenElement = prevChildren as React.ReactElement;
    const childrenElement = children as React.ReactElement;

    if (!prevChildren && !children) {
        return false;
    }

    if (!prevChildren && children) {
        return true;
    }

    if (prevChildren && !children) {
        return true;
    }

    if (
        prevChildrenElement.key === childrenElement.key &&
        prevChildrenElement.type === childrenElement.type
    ) {
        return false;
    }

    return true;
};
