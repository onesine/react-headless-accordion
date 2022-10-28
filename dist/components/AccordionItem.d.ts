import React from "react";
import { Items, Transition } from "../types";
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
export interface Props {
    children: JSX.Element | JSX.Element[] | Function;
    isActive?: boolean;
}
declare const AccordionItem: React.FC<Props>;
export default AccordionItem;
