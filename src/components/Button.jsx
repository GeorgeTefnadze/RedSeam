import React from "react";

const Button = ({
  children,
  type = "button",
  variant = "primary",
  onClick,
}) => {
  const className = `button button--${variant}`;
  return (
    <button type={type} className={className} onClick={onClick}>
      {children}
    </button>
  );
};

export default Button;
