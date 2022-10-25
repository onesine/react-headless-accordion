import React from "react";
import {AccordionItemProvider} from "./AccordionItemProvider";
import {AccordionItemProps} from "../types";

const AccordionItem: React.FC<AccordionItemProps> = ({children, isActive = false}) => {
    return (
        <AccordionItemProvider isActive={isActive}>
            {children}
        </AccordionItemProvider>
    )
};

export default AccordionItem;