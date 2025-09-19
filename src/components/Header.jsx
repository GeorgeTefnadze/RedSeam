import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";

import { useLocation, useNavigate } from "react-router-dom";

import HeaderLogo from "../assets/HeaderLogo.svg";
import HeaderAvatar from "../assets/HeaderAvatar.svg";
import CartIcon from "../assets/cartIcon.svg";

const Header = () => {
  const location = useLocation();
  const navigate = useNavigate();

  const [user, setUser] = useState(null);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  useEffect(() => {
    if (localStorage.getItem("user") !== null) {
      setUser(JSON.parse(localStorage.getItem("user")));
    }
  }, [location]);

  const handleLogout = () => {
    localStorage.removeItem("user");
    localStorage.removeItem("token");

    setUser(null);
    setIsDropdownOpen(false);
    navigate("/login");
  };

  return (
    <header className="header">
      <div className="header__logo">
        <img src={HeaderLogo} alt="header logo" />
      </div>
      <nav className="header__nav">
        {user === null ? (
          <Link to={"/"} className="header__nav-link">
            <img src={HeaderAvatar} alt="header avatar icon" />
            <span>Log in</span>
          </Link>
        ) : (
          <div className="header__nav-controls">
            <Link to="/cart" className="header__nav-cart">
              <img src={CartIcon} alt="" />
            </Link>

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
