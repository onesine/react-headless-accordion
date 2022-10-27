import React, {useContext, useMemo} from "react";
import {AccordionItemContext} from "./AccordionItemProvider";
import {Tag} from "../types";

interface Props {
    children: JSX.Element,
    as?: Tag
}

const AccordionBody: React.FC<Props> = ({children, as = "div"}) => {
    const {hash, transition} = useContext(AccordionItemContext);

    const TagName = useMemo(() => {
        if(["div", "ul"].includes(as)) {
            return as;
        }
        return "div";
    }, [as]);

    const transitionData = useMemo(() => {
        const defaultData = {
            duration: "300ms",
            timingFunction: "cubic-bezier(0, 0, 0.2, 1)"
        }

        if (transition && ("duration" in transition) && transition.duration) {
            defaultData.duration = transition.duration;
        }

        if (transition && ("timingFunction" in transition) && transition.timingFunction) {
            defaultData.timingFunction = transition.timingFunction;
        }
        return defaultData;
    }, [transition]);

    const div = useMemo(() => {
        return (
            <div
                id={`content-${hash}`}
                aria-labelledby={`button-${hash}`}
                style={
                    {
                        maxHeight: "0px",
                        transitionProperty: "max-height",
                        overflow: "hidden",
                        transitionDuration: transitionData.duration,
                        transitionTimingFunction: transitionData.timingFunction
                    }
                }
            >
                {children}
            </div>
        )
    }, [transitionData, hash]);

    switch (TagName) {
        case "div":
            return div;
        case "ul":
            return (
                <ul
                    id={`content-${hash}`}
                    aria-labelledby={`button-${hash}`}
                    style={
                        {
                            maxHeight: "0px",
                            transitionProperty: "max-height",
                            overflow: "hidden",
                            transitionDuration: transitionData.duration,
                            transitionTimingFunction: transitionData.timingFunction
                        }
                    }
                >
                    {children}
                </ul>
            );
        default :
            return div;
    }
};

export default AccordionBody;