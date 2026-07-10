function Button({
    children,
    type = "button",
    onClick,
    disabled = false,
    fullWidth = true,
    variant = "primary"
}) {

    return (

        <button
            type={type}
            onClick={onClick}
            disabled={disabled}
            className={`
                button
                button-${variant}
                ${fullWidth ? "button-full" : ""}
            `}
        >

            {children}

        </button>

    );

}

export default Button;