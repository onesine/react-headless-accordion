import React, {createContext, useCallback, useContext, useEffect, useMemo, useState} from "react";
import {Items, Transition} from "../types";
import {AccordionContext} from "./Accordion";

interface AccordionItemStore {
    accordionRef: React.MutableRefObject<null> | null,
    active: boolean,
    items: Items,
    hash: string,
    toggle: () => void,
    transition?: Transition | null,
    alwaysOpen?: boolean,
    isActive?: boolean
}

export const AccordionItemContext = createContext<AccordionItemStore>({
    accordionRef: null,
    active: false,
    items: {},
    hash: "",
    transition: null,
    alwaysOpen: false,
    toggle: () => {},
    isActive: false,
});

export interface Props {
    children: JSX.Element | JSX.Element[] | Function,
    isActive?: boolean,
}

const AccordionItem: React.FC<Props> = ({children, isActive = false}) => {
    const {accordionRef, items, setItems, transition, alwaysOpen} = useContext(AccordionContext);
    const [active, setActive] = useState<boolean>(false);

    const hash = useMemo(() => {
        return Math.random().toString(36).substring(2, 9);
    }, []);

    useEffect(() => {
        if (!(hash in items)) {
            setItems({...items, [hash]: setActive});
        }
    }, [items]);

    const value = useMemo(() => {
        return {
            accordionRef,
            active,
            toggle: () => setActive(!active),
            items,
            hash,
            transition,
            alwaysOpen,
            isActive
        }
    }, [accordionRef, active, alwaysOpen, hash, isActive, items, transition]);

    return (
        <AccordionItemContext.Provider value={value}>
            {typeof children === "function" ? children({open: active}) : children}
        </AccordionItemContext.Provider>
    )
};

export default AccordionItem;