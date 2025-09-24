import React, { useState, useEffect } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useCart } from "../contexts/CartContext"; // Import the useCart hook

import HeaderLogo from "../assets/HeaderLogo.svg";
import HeaderAvatar from "../assets/HeaderAvatar.svg";
import CartIcon from "../assets/cartIcon.svg";

const Header = () => {
  const location = useLocation();
  const navigate = useNavigate();

  // Use the cart context to get the openCart function and cartCount
  const { openCart, cartCount } = useCart();

  const [user, setUser] = useState(null);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  // Determine the correct link for the logo
  const productsLink = location.pathname.startsWith("/products/page/")
    ? location.pathname
    : "/products";

  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    } else {
      setUser(null);
    }
  }, [location.pathname]);

  const handleLogout = () => {
    localStorage.removeItem("user");
    localStorage.removeItem("token");
    setUser(null);
    setIsDropdownOpen(false);
    navigate("/login");
  };

  return (
    <header className="header">
      <Link to={productsLink} className="header__logo">
        <img src={HeaderLogo} alt="header logo" />
      </Link>
      <nav className="header__nav">
        {user === null ? (
          <Link to={"/login"} className="header__nav-link">
            <img src={HeaderAvatar} alt="header avatar icon" />
            <span>Log in</span>
          </Link>
        ) : (
          <div className="header__nav-controls">
            {/* This is now a button that opens the cart sidebar */}
            <button onClick={openCart} className="header__nav-cart">
              <img src={CartIcon} alt="Shopping Cart" />
              {/* Display the cart count if there are items */}
              {cartCount > 0 && (
                <span className="header__cart-count">{cartCount}</span>
              )}
            </button>

            <div
              className="header__nav-profile"
              onClick={() => setIsDropdownOpen(!isDropdownOpen)}
            >
              <img
                src={user.avatar || HeaderAvatar}
                alt="User Avatar"
                className="header__nav-avatar"
              />
              <svg
                className="header__nav-arrow"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M19.5 8.25l-7.5 7.5-7.5-7.5"
                />
              </svg>

              {isDropdownOpen && (
                <div className="profile-dropdown">
                  <button
                    onClick={handleLogout}
                    className="profile-dropdown__logout"
                  >
                    Log out
                  </button>
                </div>
              )}
            </div>
          </div>
        )}
      </nav>
    </header>
  );
};

export default Header;
