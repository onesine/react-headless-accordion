import React, {useRef, useContext, useMemo, useEffect, useCallback} from "react";
import {AccordionItemContext} from "./AccordionItemProvider";

type Tag = "button" | "div" | "li" | "ol" | "a";

interface Props {
    children: JSX.Element | Function,
    as?: Tag,
    className?: string,
    href?: string,
    onClick?: (e: Event) => void
}

const AccordionHeader: React.FC<Props> = ({children, as = "button", className = "", href = "", onClick}) => {
    const {hash, active, toggle, items, alwaysOpen, isActive} = useContext(AccordionItemContext);
    const ref = useRef(null);

    const TagName = useMemo(() => {
        if(["button", "div", "li", "ol", "a"].includes(as)) {
            return as;
        }
        return "button";
    }, [as]);

    useEffect(() => {
        if (isActive && ref && ref.current) {
            toggle()
            const button = ref.current as HTMLElement;
            button.setAttribute("aria-expanded", "true");
            const content = document.querySelector<HTMLElement>(`#${button.getAttribute('aria-controls')}`);
            if (content) {
                content.style.maxHeight = "none";
            }
        }
    }, []);

    useEffect(() => {
        const toggleButton = (button: HTMLElement) => {
            let ariaExpanded = button.getAttribute('aria-expanded');
            button.setAttribute('aria-expanded', ariaExpanded === "false" ? "true" : "false");
        }

        const toggleContent = (content: HTMLDivElement | HTMLUListElement) => {
            if (content) {
                const transitionEnd = () => {
                    if(content.style.maxHeight !== "0px") {
                        content.style.maxHeight = "none";
                    }

                    content.removeEventListener('transitionend', transitionEnd);
                }

                content.addEventListener('transitionend', transitionEnd);

                if (content.style.maxHeight === "0px") {
                    content.style.maxHeight = content.scrollHeight+"px";
                } else {
                    content.style.maxHeight = content.scrollHeight+"px";
                    content.style.maxHeight = content.scrollHeight+"px";
                    content.style.maxHeight = "0px";
                }
            }
        }

        if (ref && ref.current) {
            const button = ref?.current as HTMLElement;

            const showAccordion = (e: Event) => {
                // Pervent default
                if (TagName === "a") {
                    e.preventDefault();
                }

                toggle()

                if (!alwaysOpen) {
                    // Close content already open
                    const buttons = button.parentNode?.querySelectorAll<HTMLElement>(`:scope > ${TagName}[aria-expanded='true']`);
                    if (buttons) {
                        buttons.forEach(item => {
                            if (item && item !== button) {
                                const id = item.id.split("-")[1];
                                items[id](false);
                                toggleButton(item);
                                const content = document.querySelector<HTMLDivElement | HTMLUListElement>(`#${item.getAttribute('aria-controls')}`);
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
                const content = document.querySelector(`#${button.getAttribute('aria-controls')}`) as HTMLDivElement | HTMLUListElement
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
        return () => {}

    }, [TagName, alwaysOpen, items, onClick, toggle]);

    const button = useMemo(() => {
        return (
            <button
                ref={ref}
                id={`button-${hash}`}
                aria-expanded="false"
                className={className}
                aria-controls={`content-${hash}`}
            >
                {typeof children === "function" ? children({open: active}) : children}
            </button>
        )
    }, [active]);

    switch (TagName) {
        case "button":
            return button;
        case "div":
            return (
                <div
                    ref={ref}
                    id={`button-${hash}`}
                    aria-expanded="false"
                    className={className}
                    aria-controls={`content-${hash}`}
                >
                    {typeof children === "function" ? children({open: active}) : children}
                </div>
            );
        case "li":
            return (
                <li
                    ref={ref}
                    id={`button-${hash}`}
                    aria-expanded="false"
                    className={className}
                    aria-controls={`content-${hash}`}
                >
                    {typeof children === "function" ? children({open: active}) : children}
                </li>
            );
        case "ol":
            return (
                <ol
                    ref={ref}
                    id={`button-${hash}`}
                    aria-expanded="false"
                    className={className}
                    aria-controls={`content-${hash}`}
                >
                    {typeof children === "function" ? children({open: active}) : children}
                </ol>
            );
        case "a":
            return  (
                <a
                    ref={ref}
                    id={`button-${hash}`}
                    href={href}
                    aria-expanded="false"
                    className={className}
                    aria-controls={`content-${hash}`}
                >
                    {typeof children === "function" ? children({open: active}) : children}
                </a>
            );
        default :
            return button;
    }
};


export default AccordionHeader;