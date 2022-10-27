import React from "react";
import {AccordionItemProvider} from "./AccordionItemProvider";
import {AccordionItemProps} from "../types";

type Props = AccordionItemProps;

const AccordionItem: React.FC<Props> = ({children, isActive = false}) => {
    return (
        <AccordionItemProvider isActive={isActive}>
            {children}
        </AccordionItemProvider>
    )
};

export default AccordionItem;