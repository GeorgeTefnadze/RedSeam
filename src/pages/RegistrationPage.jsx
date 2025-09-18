import React, { useState } from "react";

import Header from "../components/Header";
import Input from "../components/Input";
import Button from "../components/Button";

import defaultAvatar from "../assets/HeaderAvatar.svg";

const RegistrationPage = () => {
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
  });
  const [avatarPreview, setAvatarPreview] = useState(defaultAvatar);
  const [avatarFile, setAvatarFile] = useState(null);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleAvatarUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      setAvatarFile(file);
      setAvatarPreview(URL.createObjectURL(file));
    }
  };

  const removeAvatar = () => {
    setAvatarFile(null);
    setAvatarPreview(defaultAvatar);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    console.log("Form submitted with:", { ...formData, avatar: avatarFile });
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
              <img
                src={avatarPreview}
                alt="Avatar Preview"
                className="auth-form__avatar-image"
              />
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
                <button
                  type="button"
                  onClick={removeAvatar}
                  className="action-button action-button--remove"
                >
                  Remove
                </button>
              </div>
            </div>

            <Input
              id="username"
              label="Username *"
              value={formData.username}
              onChange={handleChange}
            />
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
            <Input
              id="confirmPassword"
              label="Confirm password *"
              type="password"
              value={formData.confirmPassword}
              onChange={handleChange}
              hasIcon={true}
            />
            <Button type="submit" variant="primary">
              Register
            </Button>
            <p className="auth-form__footer">
              Already member? <a href="/login">Log in</a>
            </p>
          </form>
        </div>
      </main>
    </div>
  );
};

export default RegistrationPage;
