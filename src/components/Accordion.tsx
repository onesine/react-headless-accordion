import React from "react";
import {AccordionProvider} from "./AccordionProvider";
import {AccordionType, Tag} from "../types";

type Props = AccordionType

export const Accordion: React.FC<Props> = ({children , as = Tag.div, transition , alwaysOpen = false}) => {
    return (
        <AccordionProvider as={as} transition={transition} alwaysOpen={alwaysOpen}>
            {children}
        </AccordionProvider>
    );
};

export default Accordion;