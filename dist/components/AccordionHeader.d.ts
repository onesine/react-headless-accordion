import React from "react";
declare type Tag = "button" | "div" | "li" | "ol" | "a";
interface Props {
    children: JSX.Element | Function;
    as?: Tag;
    className?: string;
    href?: string;
    onClick?: (e: Event) => void;
}
declare const AccordionHeader: React.FC<Props>;
export default AccordionHeader;
