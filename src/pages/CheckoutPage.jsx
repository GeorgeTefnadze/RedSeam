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

  const [formData, setFormData] = useState({
    name: "",
    surname: "",
    email: "",
    address: "",
    zip_code: "",
  });

  const [checkoutStatus, setCheckoutStatus] = useState(false);

  useEffect(() => {
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

    if (!validateForm()) {
      return;
    }

    console.log(formData);
    apiClient
      .post("/cart/checkout", formData)
      .then((response) => {
        setCheckoutStatus(true);
      })
      .catch((err) => {
        console.error("Checkout failed : " + err);
        toast.error("Checkout Failed");
      });
  };

  const validateForm = () => {
    const errors = [];

    if (!formData.name.trim()) errors.push("Name is required");
    if (!formData.surname.trim()) errors.push("Surname is required");
    if (!formData.email.trim()) {
      errors.push("Email is required");
    } else {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(formData.email)) errors.push("Invalid email");
    }
    if (!formData.address.trim()) errors.push("Address is required");
    if (!formData.zip_code.trim()) {
      errors.push("ZIP code is required");
    } else {
      const zipRegex = /^\d{4,10}$/;
      if (!zipRegex.test(formData.zip_code)) errors.push("Invalid ZIP code");
    }

    if (errors.length > 0) {
      errors.forEach((el, i) => {
        setTimeout(() => {
          toast.error(el);
        }, i * 200);
      });
      return false;
    }

    return true;
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
                  />
                  <Input
                    id="surname"
                    label="Surname *"
                    value={formData.surname}
                    onChange={handleChange}
                  />
                </div>
                <Input
                  id="email"
                  label="Email *"
                  type="email"
                  value={formData.email}
                  onChange={handleChange}
                />
                <div className="checkout-form__row">
                  <Input
                    id="address"
                    label="Address *"
                    value={formData.address}
                    onChange={handleChange}
                  />
                  <Input
                    id="zip_code"
                    label="Zip code *"
                    value={formData.zip_code}
                    onChange={handleChange}
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
        <Toaster position="bottom-center" reverseOrder={false} />
        <SuccessModal isOpen={checkoutStatus} onClose={continueShopping} />
      </div>
    </>
  );
};

export default CheckoutPage;
