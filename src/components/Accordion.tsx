import React from "react";
import {AccordionProvider} from "./AccordionProvider";
import {AccordionType, Tag} from "../types";

export const Accordion: React.FC<AccordionType> = ({children , as = "div", transition , alwaysOpen = false}) => {
    return (
        <AccordionProvider as={as} transition={transition} alwaysOpen={alwaysOpen}>
            {children}
        </AccordionProvider>
    );
};

export default Accordion;