import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import apiClient from "../api/axiosConfig";
import { useNavigate } from "react-router-dom";
import toast, { Toaster } from "react-hot-toast";

import Header from "../components/Header";
import Input from "../components/Input";
import Button from "../components/Button";

import UploadImage from "../assets/UploadImage.svg";

const RegistrationPage = () => {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
    password_confirmation: "",
  });
  const [avatarPreview, setAvatarPreview] = useState(UploadImage);
  const [avatarFile, setAvatarFile] = useState(null);

  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleAvatarUpload = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    if (file.size > 1024 * 1024) {
      toast.error("Image must be less than 1MB");
      return;
    }

    setAvatarFile(file);
    setAvatarPreview(URL.createObjectURL(file));
  };

  const removeAvatar = () => {
    setAvatarFile(null);
    setAvatarPreview(null);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const errors = validateForm(formData);

    if (!errors) {
      toast.success("Form is valid, submitting...");

      const fd = new FormData();
      Object.entries(formData).forEach(([key, value]) => {
        fd.append(key, value);
      });

      if (avatarFile) {
        fd.append("avatar", avatarFile);
      }

      console.log([...fd.entries()]);
      console.log("Form submitted with:", { ...formData, avatar: avatarFile });

      apiClient
        .post(`/register`, fd, {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        })
        .then((response) => {
          console.log(response.data);

          const { token, user } = response.data;

          localStorage.setItem("token", token);
          localStorage.setItem("user", JSON.stringify(user));

          navigate("/products");
        })
        .catch((err) => {
          console.error("Register failed:", err);
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
    const errors = {};

    if (!formData.username.trim()) {
      errors.username = "Username is required";
    }

    if (!formData.email.trim()) {
      errors.email = "Email is required";
    } else {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(formData.email)) {
        errors.email = "Invalid email format";
      }
    }

    if (!formData.password.trim()) {
      errors.password = "Password is required";
    } else if (formData.password.length < 6) {
      errors.password = "Password must be at least 6 characters";
    }

    if (!formData.password_confirmation.trim()) {
      errors.password_confirmation = "Please confirm your password";
    } else if (formData.password !== formData.password_confirmation) {
      errors.password_confirmation = "Passwords do not match";
    }

    if (Object.keys(errors).length > 0) {
      return errors;
    }

    return null;
  };

  return (
    <div className="auth-page">
      <Header />
      <main className="auth-page__content">
        <div className="auth-page__image-section" />
        <div className="auth-page__form-section">
          <form className="auth-form" onSubmit={handleSubmit}>
            <h1 className="auth-form__title">Registration</h1>

            <div className="auth-form__avatar-control">
              <label
                htmlFor="avatar-upload"
                className="auth-form__avatar-label"
              >
                {avatarFile !== null ? (
                  <img
                    src={avatarPreview}
                    alt="Avatar Preview"
                    className="auth-form__avatar-image"
                  />
                ) : (
                  <img
                    src={UploadImage}
                    alt="Avatar Preview"
                    className="auth-form__avatar-preview"
                  />
                )}
              </label>
              <div className="auth-form__avatar-actions">
                <label
                  htmlFor="avatar-upload"
                  className="action-button action-button--upload"
                >
                  Upload new
                </label>
                <input
                  id="avatar-upload"
                  type="file"
                  accept="image/*"
                  onChange={handleAvatarUpload}
                  style={{ display: "none" }}
                />
                {avatarFile !== null ? (
                  <button
                    type="button"
                    onClick={removeAvatar}
                    className="action-button action-button--remove"
                  >
                    Remove
                  </button>
                ) : null}
              </div>
            </div>

            <Input
              id="username"
              label="Username *"
              value={formData.username}
              onChange={handleChange}
              errors={errors}
            />
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
            <Input
              id="password_confirmation"
              name="password_confirmation"
              label="Confirm password *"
              type="password"
              value={formData.password_confirmation}
              onChange={handleChange}
              hasIcon={true}
              errors={errors}
            />
            <Button type="submit" variant="primary">
              Register
            </Button>
            <Link to={"/login"} className="auth-form__footer">
              Already member? <span>Log in</span>
            </Link>
          </form>
        </div>
      </main>
    </div>
  );
};

export default RegistrationPage;
