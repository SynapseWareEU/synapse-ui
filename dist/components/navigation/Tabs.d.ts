import * as TabsPrimitive from "@radix-ui/react-tabs";
import type { ReactNode } from "react";
export type TabsProps = TabsPrimitive.TabsProps;
export declare function Tabs({ className, dir, ...rest }: TabsProps): import("react").JSX.Element;
export interface TabsListProps extends TabsPrimitive.TabsListProps {
    /** Actions aligned to the end of the tab row. Rendered outside `role="tablist"`. */
    extra?: ReactNode;
}
export declare function TabsList({ className, extra, ...rest }: TabsListProps): import("react").JSX.Element;
export interface TabsTriggerProps extends TabsPrimitive.TabsTriggerProps {
    /**
     * Count pill after the label (18 tall, 12/16 500 sans, tabular). Neutral at rest,
     * action-subtle while its tab is selected. Omit it for no pill; `0` renders "0".
     */
    count?: ReactNode;
    /** `"danger"` keeps the pill red in every state, for counts that are alerts (late, blocked). */
    countVariant?: "neutral" | "danger";
}
export declare function TabsTrigger({ className, children, count, countVariant, ...rest }: TabsTriggerProps): import("react").JSX.Element;
export type TabsContentProps = TabsPrimitive.TabsContentProps;
export declare function TabsContent({ className, ...rest }: TabsContentProps): import("react").JSX.Element;
//# sourceMappingURL=Tabs.d.ts.map