import React from "react";
import HeaderLogo from "../assets/HeaderLogo.svg";
import HeaderAvatar from "../assets/HeaderAvatar.svg";

const Header = () => {
  return (
    <header className="header">
      <div className="header__logo">
        <img src={HeaderLogo} alt="header logo" />
      </div>
      <nav className="header__nav">
        <a href="#login" className="header__nav-link">
          <img src={HeaderAvatar} alt="header avatar icon" />
          <span>Log in</span>
        </a>
      </nav>
    </header>
  );
};

export default Header;
