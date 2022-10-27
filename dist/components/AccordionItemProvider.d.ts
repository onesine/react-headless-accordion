import React from "react";
import { AccordionItemProps, Items, Transition } from "../types";
interface AccordionItemStore {
    accordionRef: React.MutableRefObject<null> | null;
    active: boolean;
    items: Items;
    hash: string;
    toggle: () => void;
    transition?: Transition | null;
    alwaysOpen?: boolean;
    isActive?: boolean;
}
export declare const AccordionItemContext: React.Context<AccordionItemStore>;
export declare const AccordionItemProvider: React.FC<AccordionItemProps>;
export {};
