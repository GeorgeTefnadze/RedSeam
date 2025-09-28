import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import apiClient from "../api/axiosConfig";
import { toast, Toaster } from "react-hot-toast";

import Header from "../components/Header";
import Input from "../components/Input";
import Button from "../components/Button";

const LoginPage = () => {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const [errors, setErrors] = useState({});

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

    const errors = validateForm();

    if (!errors) {
      const loginLoading = toast.loading("Logging In");

      apiClient
        .post(`/login`, formData)
        .then((response) => {
          const { token, user } = response.data;

          localStorage.setItem("token", token);
          localStorage.setItem("user", JSON.stringify(user));

          toast.dismiss(loginLoading);

          navigate("/products");
        })
        .catch((err) => {
          if (err.status === 401) {
            toast.error("Incorrect Email Or Password");
          } else {
            console.error("Login failed:", err);
          }
        });
    } else {
      Object.values(errors).forEach((msg, i) => {
        setTimeout(() => toast.error(msg), i * 200);
      });
      setErrors(errors);
      setTimeout(() => {
        setErrors({});
      }, 2000);
    }
  };

  const validateForm = () => {
    let newErrors = {};

    if (!formData.email.trim()) {
      newErrors.email = "Email is Required";
    }

    if (!formData.password.trim()) {
      newErrors.password = "Password is Required";
    }

    if (Object.keys(newErrors).length > 0) {
      return newErrors;
    }

    return null;
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
              errors={errors}
            />
            <Input
              id="password"
              label="Password *"
              type="password"
              value={formData.password}
              onChange={handleChange}
              hasIcon={true}
              errors={errors}
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
