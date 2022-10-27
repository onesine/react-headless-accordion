import React, {createContext, useCallback, useMemo, useRef, useState} from "react";
import {Tag, AccordionType, Items, Transition} from "../types";

interface AccordionStore {
    accordionRef:  React.MutableRefObject<null> | null,
    items: Items,
    setItems: (value: Items) => void,
    transition?: Transition | null,
    alwaysOpen?: boolean
}

export const AccordionContext = createContext<AccordionStore>({
    accordionRef: null,
    items: {},
    setItems: (data) => {},
    transition: null,
    alwaysOpen: false
});

export const AccordionProvider: React.FC<AccordionType> = ({children, as, transition, alwaysOpen}) => {
    const accordionRef = useRef(null);
    const [items, setItems] = useState<Items>({});

    const TagName = useMemo(() => {
        if(as && ["div", "ul"].includes(as)) {
            return as;
        }
        return "div";
    }, [as]);

    const printTag = useCallback(() => {
        const div = (
            <div ref={accordionRef}>
                {children}
            </div>
        );

        switch (TagName) {
            case "div":
                return div;
            case "ul":
                return (
                    <ul ref={accordionRef}>
                        {children}
                    </ul>
                )
            default :
                return div;
        }
    }, []);

    const value = useMemo(() => {
        return {
            accordionRef,
            items,
            setItems,
            transition,
            alwaysOpen
        };
    }, [alwaysOpen, items, transition]);

    return (
        <AccordionContext.Provider value={value}>
            {printTag()}
        </AccordionContext.Provider>
    );
};