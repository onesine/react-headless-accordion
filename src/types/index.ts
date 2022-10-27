export interface Transition {
    duration?: string,
    timingFunction?: string
}

export enum Tag {
    div = "div",
    ul = "ul",
}

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