import React from "react";

const Button = ({ children, type = "submit", variant = "primary" }) => {
  const className = `button button--${variant}`;
  return (
    <button type={type} className={className}>
      {children}
    </button>
  );
};

export default Button;
