/**
 * Mapper of internal uid keys and 'TransitionChild'.
 * @internal
 */
export interface ChildrenMapper extends Record<string, React.ReactElement> { }

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
     * Removes children from from all instances where it's being used.
     * To be called once exit animation finished.
     * @returns Number of remaining children in the exit list.
     */
    removeExit: (internalKey: string) => number;
    /**
     * Removes children from internal enter list.
     * @returns Number of remaining children in the enter list.
     */
    removeEnter: (internalKey: string) => number;
    /**
     * List of internal keys of the children that are current exiting.
     */
    exitKeys: string[];
    /**
     * List of internal keys of the children that are currently entering.
     */
    enterKeys: string[];
}
