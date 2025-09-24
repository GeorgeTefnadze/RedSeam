import React from "react";
import { useCart } from "../contexts/CartContext";
import Button from "./Button";
import EmptyCartIcon from "../assets/EmptyCartIcon.svg";

const CartSidebar = () => {
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
  } = useCart();

  if (!isCartOpen) {
    return null;
  }

  return (
    <>
      <div className="cart-overlay" onClick={closeCart}></div>

      <aside className="cart-sidebar">
        <header className="cart-sidebar__header">
          <h2 className="cart-sidebar__title">My Cart</h2>
          <button className="cart-sidebar__close-btn" onClick={closeCart}>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </button>
        </header>

        {loading && <div className="cart-sidebar__loader">Updating...</div>}

        {cartItems.length === 0 && !loading ? (
          <div className="cart-sidebar__empty">
            <img
              src={EmptyCartIcon}
              alt="Empty Cart"
              className="cart-sidebar__empty-icon"
            />
            <h3 className="cart-sidebar__empty-title">Ooops!</h3>
            <p className="cart-sidebar__empty-text">
              You've got nothing in your cart just yet...
            </p>
            <Button variant="primary" onClick={closeCart}>
              Start shopping
            </Button>
          </div>
        ) : (
          <>
            <div className="cart-sidebar__items">
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
                        onClick={() => updateQuantity(item, item.quantity - 1)}
                      >
                        -
                      </button>
                      <span>{item.quantity}</span>
                      <button
                        onClick={() => updateQuantity(item, item.quantity + 1)}
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

            <footer className="cart-sidebar__footer">
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
              <Button variant="primary">Checkout</Button>
            </footer>
          </>
        )}
      </aside>
    </>
  );
};

export default CartSidebar;
