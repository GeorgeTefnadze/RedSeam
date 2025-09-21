import React, { useState } from "react";

const Input = ({
  id,
  label = "",
  placeholder,
  type = "text",
  value,
  onChange,
  hasIcon = false,
}) => {
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);

  const togglePasswordVisibility = () => {
    setIsPasswordVisible(!isPasswordVisible);
  };

  const inputType = type === "password" && isPasswordVisible ? "text" : type;

  const hasAsterisk = label.includes("*");
  const labelText = label.replace("*", "").trim();

  return (
    <div className="form-group">
      <div className="form-group__input-wrapper">
        <input
          type={inputType}
          id={id}
          name={id}
          className="form-group__input"
          value={value}
          onChange={onChange}
          placeholder={label ? " " : placeholder}
          required={hasAsterisk}
        />

        {label && (
          <label htmlFor={id} className="form-group__label">
            {labelText}
            {hasAsterisk && (
              <span className="form-group__label-asterisk"> *</span>
            )}
          </label>
        )}
        {type === "password" && hasIcon && (
          <button
            type="button"
            onClick={togglePasswordVisibility}
            className="form-group__icon"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="16"
              height="16"
              fill="currentColor"
              viewBox="0 0 16 16"
            >
              <path d="M16 8s-3-5.5-8-5.5S0 8 0 8s3 5.5 8 5.5S16 8 16 8zM1.173 8a13.133 13.133 0 0 1 1.66-2.043C4.12 4.668 5.88 3.5 8 3.5c2.12 0 3.879 1.168 5.168 2.457A13.133 13.133 0 0 1 14.828 8c-.058.087-.122.183-.195.288-.335.48-.83 1.12-1.465 1.755C11.879 11.332 10.12 12.5 8 12.5c-2.12 0-3.879-1.168-5.168-2.457A13.134 13.134 0 0 1 1.172 8z" />
              <path d="M8 5.5a2.5 2.5 0 1 0 0 5 2.5 2.5 0 0 0 0-5zM4.5 8a3.5 3.5 0 1 1 7 0 3.5 3.5 0 0 1-7 0z" />
            </svg>
          </button>
        )}
      </div>
    </div>
  );
};

export default Input;
