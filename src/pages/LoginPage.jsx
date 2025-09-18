import React, { useState } from "react";

import Header from "../components/Header";
import Input from "../components/Input";
import Button from "../components/Button";

const LoginPage = () => {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    console.log("Form submitted with:", formData);
  };

  return (
    <div className="login-page">
      <Header />
      <main className="login-page__content">
        <div className="login-page__image-section"></div>
        <div className="login-page__form-section">
          <form className="login-form" onSubmit={handleSubmit}>
            <h1 className="login-form__title">Log in</h1>
            <Input
              id="email"
              label="Email *"
              type="email"
              value={formData.email}
              onChange={handleChange}
            />
            <Input
              id="password"
              label="Password *"
              type="password"
              value={formData.password}
              onChange={handleChange}
              hasIcon={true}
            />
            <Button type="submit" variant="primary">
              Log in
            </Button>
            <p className="login-form__footer">
              Not a member? <a href="#register">Register</a>
            </p>
          </form>
        </div>
      </main>
    </div>
  );
};

export default LoginPage;
