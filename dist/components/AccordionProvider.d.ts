import React from "react";
import { AccordionType, Items, Transition } from "../types";
interface AccordionStore {
    accordionRef: React.MutableRefObject<null> | null;
    items: Items;
    setItems: (value: Items) => void;
    transition?: Transition | null;
    alwaysOpen?: boolean;
}
export declare const AccordionContext: React.Context<AccordionStore>;
export declare const AccordionProvider: React.FC<AccordionType>;
export {};
