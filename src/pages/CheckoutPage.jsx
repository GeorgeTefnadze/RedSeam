import React, { useState, useEffect } from "react";
import { useCart } from "../contexts/CartContext";
import { useNavigate } from "react-router-dom";
import apiClient from "../api/axiosConfig";
import toast, { Toaster } from "react-hot-toast";

import Header from "../components/Header";
import Input from "../components/Input";
import Button from "../components/Button";
import SuccessModal from "../components/SuccessModal";

const CheckoutPage = () => {
  const navigate = useNavigate();

  const {
    isCartOpen,
    closeCart,
    cartItems,
    removeFromCart,
    updateQuantity,
    subtotal,
    deliveryFee,
    total,
    loading,
    fetchCart,
  } = useCart();

  const storedUser = localStorage.getItem("user");

  const [formData, setFormData] = useState({
    name: "",
    surname: "",
    email: JSON.parse(storedUser).email,
    address: "",
    zip_code: "",
  });

  const [checkoutStatus, setCheckoutStatus] = useState(false);

  const [errors, setErrors] = useState({});

  useEffect(() => {
    console.log(localStorage.getItem("user"));

    if (cartItems.length === 0) {
      navigate("/products");
    }
  }, [cartItems, navigate]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevState) => ({ ...prevState, [name]: value }));
  };

  const handlePay = (e) => {
    e.preventDefault();

    const errors = validateForm(formData);

    if (!errors) {
      apiClient
        .post("/cart/checkout", formData)
        .then((response) => {
          setCheckoutStatus(true);
        })
        .catch((err) => {
          console.error("Checkout failed : " + err);
          toast.error("Checkout Failed");
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

    if (!formData.name.trim()) errors.name = "Name is required";
    if (!formData.surname.trim()) errors.surname = "Surname is required";
    if (!formData.email.trim()) {
      errors.email = "Email is required";
    } else {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(formData.email)) errors.email = "Invalid email";
    }
    if (!formData.address.trim()) errors.address = "Address is required";
    if (!formData.zip_code.trim()) {
      errors.zip_code = "ZIP code is required";
    } else {
      const zipRegex = /^\d{4,10}$/;
      if (!zipRegex.test(formData.zip_code))
        errors.zip_code("Invalid ZIP code");
    }

    if (Object.keys(errors).length > 0) {
      return errors;
    }

    return null;
  };

  const continueShopping = () => {
    fetchCart();
    navigate("/products");
  };

  return (
    <>
      <Header />
      <div className="checkout-page">
        <h1 className="checkout-page__title">Checkout</h1>
        <div className="checkout-page__content">
          <main className="checkout-page__main">
            <div className="checkout-form-container">
              <h2 className="checkout-form-container__title">Order details</h2>
              <form className="checkout-form" onSubmit={handlePay}>
                <div className="checkout-form__row">
                  <Input
                    id="name"
                    label="Name *"
                    value={formData.name}
                    onChange={handleChange}
                    errors={errors}
                  />
                  <Input
                    id="surname"
                    label="Surname *"
                    value={formData.surname}
                    onChange={handleChange}
                    errors={errors}
                  />
                </div>
                <Input
                  id="email"
                  label="Email *"
                  type="email"
                  value={formData.email}
                  onChange={handleChange}
                  errors={errors}
                />
                <div className="checkout-form__row">
                  <Input
                    id="address"
                    label="Address *"
                    value={formData.address}
                    onChange={handleChange}
                    errors={errors}
                  />
                  <Input
                    id="zip_code"
                    label="Zip code *"
                    value={formData.zip_code}
                    onChange={handleChange}
                    errors={errors}
                  />
                </div>
              </form>
            </div>
          </main>
          <aside className="checkout-page__summary">
            <div className="checkout-summary-container">
              <div className="checkout-summary__items">
                {cartItems.map((item) => (
                  <div
                    key={`${crypto.randomUUID()}-${item.color}-${item.size}`}
                    className="cart-item"
                  >
                    <img
                      src={item.cover_image}
                      alt={item.name}
                      className="cart-item__image"
                    />
                    <div className="cart-item__details">
                      <p className="cart-item__name">{item.name}</p>
                      <p className="cart-item__color">{item.color}</p>
                      <p className="cart-item__size">{item.size}</p>
                      <div className="cart-item__quantity-controls">
                        <button
                          onClick={() =>
                            updateQuantity(item, item.quantity - 1)
                          }
                        >
                          -
                        </button>
                        <span>{item.quantity}</span>
                        <button
                          onClick={() =>
                            updateQuantity(item, item.quantity + 1)
                          }
                        >
                          +
                        </button>
                      </div>
                    </div>
                    <div className="cart-item__actions">
                      <p className="cart-item__price">
                        ${item.total_price.toFixed(2)}
                      </p>
                      <button
                        className="cart-item__remove-btn"
                        onClick={() => removeFromCart(item)}
                      >
                        Remove
                      </button>
                    </div>
                  </div>
                ))}
              </div>
              <div className="cart-summary">
                <div className="cart-summary__row">
                  <span>Subtotal</span>
                  <span>${subtotal.toFixed(2)}</span>
                </div>
                <div className="cart-summary__row">
                  <span>Delivery fee</span>
                  <span>${deliveryFee.toFixed(2)}</span>
                </div>
                <div className="cart-summary__row cart-summary__row--total">
                  <span>Total</span>
                  <span>${total.toFixed(2)}</span>
                </div>
              </div>
              <Button variant="primary" onClick={handlePay}>
                Pay
              </Button>
            </div>
          </aside>
        </div>
        <SuccessModal isOpen={checkoutStatus} onClose={continueShopping} />
      </div>
    </>
  );
};

export default CheckoutPage;
