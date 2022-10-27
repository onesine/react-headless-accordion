export interface Transition {
    duration?: string,
    timingFunction?: string
}

export type Tag = "div" | "ul";

export interface AccordionType {
    children: JSX.Element,
    as?: Tag,
    transition?: Transition,
    alwaysOpen?: boolean
}

export interface AccordionItemProps {
    children: JSX.Element,
    isActive?: boolean
}

export interface Items {
    [key: string]: (value: boolean) => void
}