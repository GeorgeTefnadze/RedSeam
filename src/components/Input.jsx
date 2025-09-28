import React, { useState, useEffect } from "react";

import eye from "../assets/eye.svg";
import eyeActive from "../assets/eye-active.svg";

const Input = ({
  id,
  label = "",
  placeholder,
  type = "text",
  value,
  onChange,
  hasIcon = false,
  errors,
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
        />

        {label && (
          <label
            htmlFor={id}
            className="form-group__label"
            style={errors && errors[id] ? { color: "red" } : {}}
          >
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
            {isPasswordVisible ? (
              <img src={eyeActive}></img>
            ) : (
              <img src={eye}></img>
            )}
          </button>
        )}
      </div>
    </div>
  );
};

export default Input;
