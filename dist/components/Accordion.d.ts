import React from "react";
import { Items, Transition } from "../types";
interface AccordionStore {
    accordionRef: React.MutableRefObject<null> | null;
    items: Items;
    setItems: (value: Items) => void;
    transition?: Transition | null;
    alwaysOpen?: boolean;
}
export declare const AccordionContext: React.Context<AccordionStore>;
interface Props {
    children: JSX.Element | JSX.Element[];
    as?: string;
    transition?: Transition;
    alwaysOpen?: boolean;
    className?: string;
}
export declare const Accordion: React.FC<Props>;
export default Accordion;
