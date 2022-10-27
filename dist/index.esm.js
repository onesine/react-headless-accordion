import React, { createContext, useRef, useState, useMemo, useCallback, useContext, useEffect } from 'react';

const AccordionContext = createContext({
    accordionRef: null,
    items: {},
    setItems: (data) => { },
    transition: null,
    alwaysOpen: false
});
const AccordionProvider = ({ children, as, transition, alwaysOpen }) => {
    const accordionRef = useRef(null);
    const [items, setItems] = useState({});
    const TagName = useMemo(() => {
        if (as && ["div", "ul"].includes(as)) {
            return as;
        }
        return "div";
    }, [as]);
    const printTag = useCallback(() => {
        const div = (React.createElement("div", { ref: accordionRef }, children));
        switch (TagName) {
            case "div":
                return div;
            case "ul":
                return (React.createElement("ul", { ref: accordionRef }, children));
            default:
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
    return (React.createElement(AccordionContext.Provider, { value: value }, printTag()));
};

const Accordion = ({ children, as = "div", transition, alwaysOpen = false }) => {
    return (React.createElement(AccordionProvider, { as: as, transition: transition, alwaysOpen: alwaysOpen }, children));
};

const AccordionItemContext = createContext({
    accordionRef: null,
    active: false,
    items: {},
    hash: "",
    transition: null,
    alwaysOpen: false,
    toggle: () => { },
    isActive: false,
});
const AccordionItemProvider = ({ children, isActive }) => {
    const { accordionRef, items, setItems, transition, alwaysOpen } = useContext(AccordionContext);
    const [active, setActive] = useState(false);
    const hash = useMemo(() => {
        return Math.random().toString(36).substring(2, 9);
    }, []);
    useEffect(() => {
        if (!(hash in items)) {
            setItems({ ...items, [hash]: setActive });
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
        };
    }, [accordionRef, active, alwaysOpen, hash, isActive, items, transition]);
    return (React.createElement(AccordionItemContext.Provider, { value: value }, children));
};

const AccordionItem = ({ children, isActive = false }) => {
    return (React.createElement(AccordionItemProvider, { isActive: isActive }, children));
};

const AccordionHeader = ({ children, as = "button", className = "", href = "", onClick }) => {
    const { hash, active, toggle, items, alwaysOpen, isActive } = useContext(AccordionItemContext);
    const ref = useRef(null);
    const TagName = useMemo(() => {
        if (["button", "div", "li", "ol", "a"].includes(as)) {
            return as;
        }
        return "button";
    }, [as]);
    useEffect(() => {
        if (isActive && ref && ref.current) {
            toggle();
            const button = ref.current;
            button.setAttribute("aria-expanded", "true");
            const content = document.querySelector(`#${button.getAttribute('aria-controls')}`);
            if (content) {
                content.style.maxHeight = "none";
            }
        }
    }, []);
    useEffect(() => {
        const toggleButton = (button) => {
            let ariaExpanded = button.getAttribute('aria-expanded');
            button.setAttribute('aria-expanded', ariaExpanded === "false" ? "true" : "false");
        };
        const toggleContent = (content) => {
            if (content) {
                const transitionEnd = () => {
                    if (content.style.maxHeight !== "0px") {
                        content.style.maxHeight = "none";
                    }
                    content.removeEventListener('transitionend', transitionEnd);
                };
                content.addEventListener('transitionend', transitionEnd);
                if (content.style.maxHeight === "0px") {
                    content.style.maxHeight = content.scrollHeight + "px";
                }
                else {
                    content.style.maxHeight = content.scrollHeight + "px";
                    content.style.maxHeight = content.scrollHeight + "px";
                    content.style.maxHeight = "0px";
                }
            }
        };
        if (ref && ref.current) {
            const button = ref?.current;
            const showAccordion = (e) => {
                // Pervent default
                if (TagName === "a") {
                    e.preventDefault();
                }
                toggle();
                if (!alwaysOpen) {
                    // Close content already open
                    const buttons = button.parentNode?.querySelectorAll(`:scope > ${TagName}[aria-expanded='true']`);
                    if (buttons) {
                        buttons.forEach(item => {
                            if (item && item !== button) {
                                const id = item.id.split("-")[1];
                                items[id](false);
                                toggleButton(item);
                                const content = document.querySelector(`#${item.getAttribute('aria-controls')}`);
                                if (content) {
                                    toggleContent(content);
                                }
                            }
                        });
                    }
                }
                // Toggle Button
                toggleButton(button);
                // Toggle Content
                const content = document.querySelector(`#${button.getAttribute('aria-controls')}`);
                toggleContent(content);
                if (onClick) {
                    onClick(e);
                }
            };
            if (button) {
                button.addEventListener('click', showAccordion);
            }
            return () => {
                if (button) {
                    button.removeEventListener('click', showAccordion);
                }
            };
        }
        return () => { };
    }, [TagName, alwaysOpen, items, onClick, toggle]);
    const button = useMemo(() => {
        return (React.createElement("button", { ref: ref, id: `button-${hash}`, "aria-expanded": "false", className: className, "aria-controls": `content-${hash}` }, typeof children === "function" ? children({ open: active }) : children));
    }, [active]);
    switch (TagName) {
        case "button":
            return button;
        case "div":
            return (React.createElement("div", { ref: ref, id: `button-${hash}`, "aria-expanded": "false", className: className, "aria-controls": `content-${hash}` }, typeof children === "function" ? children({ open: active }) : children));
        case "li":
            return (React.createElement("li", { ref: ref, id: `button-${hash}`, "aria-expanded": "false", className: className, "aria-controls": `content-${hash}` }, typeof children === "function" ? children({ open: active }) : children));
        case "ol":
            return (React.createElement("ol", { ref: ref, id: `button-${hash}`, "aria-expanded": "false", className: className, "aria-controls": `content-${hash}` }, typeof children === "function" ? children({ open: active }) : children));
        case "a":
            return (React.createElement("a", { ref: ref, id: `button-${hash}`, href: href, "aria-expanded": "false", className: className, "aria-controls": `content-${hash}` }, typeof children === "function" ? children({ open: active }) : children));
        default:
            return button;
    }
};

const AccordionBody = ({ children, as = "div" }) => {
    const { hash, transition } = useContext(AccordionItemContext);
    const TagName = useMemo(() => {
        if (["div", "ul"].includes(as)) {
            return as;
        }
        return "div";
    }, [as]);
    const transitionData = useMemo(() => {
        const defaultData = {
            duration: "300ms",
            timingFunction: "cubic-bezier(0, 0, 0.2, 1)"
        };
        if (transition && ("duration" in transition) && transition.duration) {
            defaultData.duration = transition.duration;
        }
        if (transition && ("timingFunction" in transition) && transition.timingFunction) {
            defaultData.timingFunction = transition.timingFunction;
        }
        return defaultData;
    }, [transition]);
    const div = useMemo(() => {
        return (React.createElement("div", { id: `content-${hash}`, "aria-labelledby": `button-${hash}`, style: {
                maxHeight: "0px",
                transitionProperty: "max-height",
                overflow: "hidden",
                transitionDuration: transitionData.duration,
                transitionTimingFunction: transitionData.timingFunction
            } }, children));
    }, [transitionData, hash]);
    switch (TagName) {
        case "div":
            return div;
        case "ul":
            return (React.createElement("ul", { id: `content-${hash}`, "aria-labelledby": `button-${hash}`, style: {
                    maxHeight: "0px",
                    transitionProperty: "max-height",
                    overflow: "hidden",
                    transitionDuration: transitionData.duration,
                    transitionTimingFunction: transitionData.timingFunction
                } }, children));
        default:
            return div;
    }
};

export { Accordion, AccordionBody, AccordionHeader, AccordionItem };
//# sourceMappingURL=index.esm.js.map
