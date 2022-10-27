'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var React = require('react');

function _interopDefaultLegacy (e) { return e && typeof e === 'object' && 'default' in e ? e : { 'default': e }; }

var React__default = /*#__PURE__*/_interopDefaultLegacy(React);

const AccordionContext = React.createContext({
    accordionRef: null,
    items: {},
    setItems: (data) => { },
    transition: null,
    alwaysOpen: false
});
const AccordionProvider = ({ children, as, transition, alwaysOpen }) => {
    const accordionRef = React.useRef(null);
    const [items, setItems] = React.useState({});
    const TagName = React.useMemo(() => {
        if (as && ["div", "ul"].includes(as)) {
            return as;
        }
        return "div";
    }, [as]);
    const printTag = React.useCallback(() => {
        const div = (React__default["default"].createElement("div", { ref: accordionRef }, children));
        switch (TagName) {
            case "div":
                return div;
            case "ul":
                return (React__default["default"].createElement("ul", { ref: accordionRef }, children));
            default:
                return div;
        }
    }, []);
    const value = React.useMemo(() => {
        return {
            accordionRef,
            items,
            setItems,
            transition,
            alwaysOpen
        };
    }, [alwaysOpen, items, transition]);
    return (React__default["default"].createElement(AccordionContext.Provider, { value: value }, printTag()));
};

const Accordion = ({ children, as = "div", transition, alwaysOpen = false }) => {
    return (React__default["default"].createElement(AccordionProvider, { as: as, transition: transition, alwaysOpen: alwaysOpen }, children));
};

const AccordionItemContext = React.createContext({
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
    const { accordionRef, items, setItems, transition, alwaysOpen } = React.useContext(AccordionContext);
    const [active, setActive] = React.useState(false);
    const hash = React.useMemo(() => {
        return Math.random().toString(36).substring(2, 9);
    }, []);
    React.useEffect(() => {
        if (!(hash in items)) {
            setItems({ ...items, [hash]: setActive });
        }
    }, [items]);
    const value = React.useMemo(() => {
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
    return (React__default["default"].createElement(AccordionItemContext.Provider, { value: value }, children));
};

const AccordionItem = ({ children, isActive = false }) => {
    return (React__default["default"].createElement(AccordionItemProvider, { isActive: isActive }, children));
};

const AccordionHeader = ({ children, as = "button", className = "", href = "", onClick }) => {
    const { hash, active, toggle, items, alwaysOpen, isActive } = React.useContext(AccordionItemContext);
    const ref = React.useRef(null);
    const TagName = React.useMemo(() => {
        if (["button", "div", "li", "ol", "a"].includes(as)) {
            return as;
        }
        return "button";
    }, [as]);
    React.useEffect(() => {
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
    React.useEffect(() => {
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
    const button = React.useMemo(() => {
        return (React__default["default"].createElement("button", { ref: ref, id: `button-${hash}`, "aria-expanded": "false", className: className, "aria-controls": `content-${hash}` }, typeof children === "function" ? children({ open: active }) : children));
    }, [active]);
    switch (TagName) {
        case "button":
            return button;
        case "div":
            return (React__default["default"].createElement("div", { ref: ref, id: `button-${hash}`, "aria-expanded": "false", className: className, "aria-controls": `content-${hash}` }, typeof children === "function" ? children({ open: active }) : children));
        case "li":
            return (React__default["default"].createElement("li", { ref: ref, id: `button-${hash}`, "aria-expanded": "false", className: className, "aria-controls": `content-${hash}` }, typeof children === "function" ? children({ open: active }) : children));
        case "ol":
            return (React__default["default"].createElement("ol", { ref: ref, id: `button-${hash}`, "aria-expanded": "false", className: className, "aria-controls": `content-${hash}` }, typeof children === "function" ? children({ open: active }) : children));
        case "a":
            return (React__default["default"].createElement("a", { ref: ref, id: `button-${hash}`, href: href, "aria-expanded": "false", className: className, "aria-controls": `content-${hash}` }, typeof children === "function" ? children({ open: active }) : children));
        default:
            return button;
    }
};

const AccordionBody = ({ children, as = "div" }) => {
    const { hash, transition } = React.useContext(AccordionItemContext);
    const TagName = React.useMemo(() => {
        if (["div", "ul"].includes(as)) {
            return as;
        }
        return "div";
    }, [as]);
    const transitionData = React.useMemo(() => {
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
    const div = React.useMemo(() => {
        return (React__default["default"].createElement("div", { id: `content-${hash}`, "aria-labelledby": `button-${hash}`, style: {
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
            return (React__default["default"].createElement("ul", { id: `content-${hash}`, "aria-labelledby": `button-${hash}`, style: {
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

exports.Accordion = Accordion;
exports.AccordionBody = AccordionBody;
exports.AccordionHeader = AccordionHeader;
exports.AccordionItem = AccordionItem;
//# sourceMappingURL=index.cjs.js.map
