import ButtonSvg from "../assets/svg/ButtonSvg";
import React from "react";

const Button = React.forwardRef(({ className, href, onClick, children, px, white }, ref) => {
    const classes = `button relative inline-flex items-center justify-center h-11 transition-colors hover:text-color-1 ${
        px || "px-7"
    } ${white ? "text-n-8" : "text-n-1"} ${className || ""}`;
    const spanClasses = "relative z-10";

    const renderButton = () => (
        <button className={classes} onClick={onClick}>
            <span className={spanClasses} ref={ref}>{children}</span>
            {ButtonSvg(white)}
        </button>
    );

    const renderLink = () => (
        <a href={href} className={classes}>
            <span className={spanClasses} ref={ref}>{children}</span>
            {ButtonSvg(white)}
        </a>
    );

    return href ? renderLink() : renderButton();
});

export default Button;

//The button gets SCSS properties through classes - it inherits the className of the parent element making it more flexible - can be used throughout a big website

// IMPORTANT: in short - this button is flexible component that works as a wrapper for either button as in the sign in and up or any other button. Or it can render the links of the navbar - router links - so in use of HamburgerMenu it will render the links of the navbar.


//The Button component in your code is designed to be flexible. It can either render as a <button> element or as an <a> (anchor) element, depending on whether the href prop is provided.

//Here's a breakdown:

//renderButton is a function that returns a <button> element. This is used when the Button component is meant to trigger some JavaScript when clicked, like opening a modal. The onClick prop is used to specify the JavaScript function that should run when the button is clicked.

//renderLink is a function that returns an <a> element. This is used when the Button component is meant to navigate to a different page or a different part of the same page. The href prop is used to specify the URL to navigate to when the link is clicked.

//In the return statement, href ? renderLink() : renderButton() checks if the href prop is provided. If href is truthy (i.e., a URL is provided), it calls renderLink() to render an <a> element. If href is falsy (i.e., no URL is provided), it calls renderButton() to render a <button> element.

//This design allows the Button component to be reused in many different contexts, while keeping the code DRY (Don't Repeat Yourself). The children prop allows any content to be placed inside the button or link, and the className, px, and white props allow the appearance of the button or link to be customized.