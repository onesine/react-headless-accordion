import React from "react";
interface Props {
    children: JSX.Element | JSX.Element[];
    as?: string;
    className?: string;
    href?: string;
    onClick?: (e: Event) => void;
}
declare const AccordionHeader: React.FC<Props>;
export default AccordionHeader;
