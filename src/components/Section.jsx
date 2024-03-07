import SectionSvg from "../assets/svg/SectionSvg";
import React from "react";

const Section = React.forwardRef(({
    className,
    id,
    crosses,
    crossesOffset,
    customPaddings,
    children,
}, ref) => {
    return(
        <div
            id={id}
            className={`relative ${customPaddings || `py-10 lg:py-16 xl:py-20 ${crosses ? "lg:py-32 xl:py-40" : ""}`
            // this classname is saying, that this section can be modifyiable by the parent element - it can have custom paddings or it can have crosses or not, and if there is no custom padding it will have the default padding or if there is no crosses it will have the default padding for the section
            } 
            ${className || ""}`}
            // and it will have className or empty aray - so it can be modified by the parent element
        >
            {children}

            <div className="hidden absolute top-0 left-5 w-0.25 h-full bg-stroke-1 pointer-events-none md:block lg:left-7.5 xl:left-10" />
            <div className="hidden absolute top-0 right-5 w-0.25 h-full bg-stroke-1 pointer-events-none md:block lg:right-7.5 xl:right-10" />

            {crosses && (
                <>
                    <div 
                        className={`hidden absolute top-0 left-7.5 right-7.5 h-0.25 bg-stroke-1 ${crossesOffset && crossesOffset} pointer-events-none lg:block xl:left-10 right-10`}
                        //In your code, {crosses && (...)} is saying "if crosses is truthy, then render the elements inside the parentheses". If crosses is falsy (like null, undefined, false, 0, or ""), then nothing will be rendered.
                    />
                    <SectionSvg crossesOffset={crossesOffset}/>
                </>
            )}
        </div>
    )
});

export default Section;