export interface SelectOption {
    label: string;
    value: string;
    disabled?: boolean;
    /** Second line under the label, 13/18 ink-2; the option row grows to 48. */
    description?: string;
    /**
     * Identifier shown before the label: the reference pair (§2.2), e.g. `CUST-003` + "PetVet Cluj".
     * The code is IBM Plex Mono 500, the label follows in ink-2 with an ellipsis, in the list and in
     * the Select trigger alike.
     */
    code?: string;
}
export interface CascaderOption {
    label: string;
    value: string;
    disabled?: boolean;
    children?: CascaderOption[];
}
export interface TreeSelectNode {
    key: string;
    title: string;
    disabled?: boolean;
    children?: TreeSelectNode[];
}
export type InputSize = "sm" | "md" | "lg";
//# sourceMappingURL=types.d.ts.map