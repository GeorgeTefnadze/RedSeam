import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import apiClient from "../api/axiosConfig";

import Header from "../components/Header";
import Input from "../components/Input";
import Button from "../components/Button";

const LoginPage = () => {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const [error, setError] = useState(null);

  useEffect(() => {
    if (localStorage.getItem("user") !== null) {
      navigate("/products");
    }
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setError(null);

    apiClient
      .post(`/login`, formData)
      .then((response) => {
        console.log(response.data);

        const { token, user } = response.data;

        localStorage.setItem("token", token);
        localStorage.setItem("user", JSON.stringify(user));

        navigate("/products");
      })
      .catch((err) => {
        console.error("Login failed:", err);
        setError("Invalid email or password. Please try again.");
      });
  };

  return (
    <div className="auth-page">
      <Header />
      <main className="auth-page__content">
        <div className="auth-page__image-section"></div>
        <div className="auth-page__form-section">
          <form className="auth-form" onSubmit={handleSubmit}>
            <h1 className="auth-form__title">Log in</h1>
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
            <Link to={"/register"} className="auth-form__footer">
              Not a member? <span>Register</span>
            </Link>
          </form>
        </div>
      </main>
    </div>
  );
};

export default LoginPage;
