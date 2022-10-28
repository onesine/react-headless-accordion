import React, {useContext, useMemo} from "react";
import {AccordionItemContext} from "./AccordionItem";

interface Props {
    children: JSX.Element | JSX.Element[],
    as?: string
    className?: string
}

const AccordionBody: React.FC<Props> = ({children, as = "div", className = ""}) => {
    const {hash, transition} = useContext(AccordionItemContext);

    const TagName: any = useMemo(() => {
        if(as) {
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

    return (
        <TagName
            id={`content-${hash}`}
            aria-labelledby={`button-${hash}`}
            className={className}
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
        </TagName>
    );
};

export default AccordionBody;