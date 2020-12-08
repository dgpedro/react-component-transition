/**
 * Transtion properties to be applied to each children of the list,
 * including the children itself.
 * @internal
 */
export interface TransitionChildren {
    /**
     * Reference to each children of the list.
     */
    children: React.ReactElement,
    /**
     * 'true' if 'children' should enter into DOM.
     */
    shouldEnter: boolean;
    /**
     * 'true' if 'children' should leave the DOM.
     */
    shouldExit: boolean;
}

/**
 * Mapper of internal uid keys and 'TransitionChild'.
 * @internal
 */
export interface ChildrenMapper extends Record<string, TransitionChildren> { }

/**
 * The output transformed children.
 * @internal
 */
export interface ChildrenManagerOut {
    /**
     * Current mapper after the render.
     */
    childrenMapper: ChildrenMapper;
    /**
     * Internal uid keys which identifies each of the current and previous children
     * in proper order to be rendered.
     */
    internalKeys: string[];
    /**
     * The number of children currently exiting the DOM.
     */
    exitCounter: number;
    /**
     * Removes children from 'childrenMapper' and 'internalKeys'.
     * To be called once exit animation finished.
     */
    removeChild: (internalKey: string) => void;
}
