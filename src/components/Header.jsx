import { useState } from "react";
import "./Header.css";
import { IoSearchOutline } from "react-icons/io5";

function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <div className="header">
      <div className="navBar">
        <div className="logo">
          <img src="/logo.svg" alt="Columbia Cribs Logo" />
          <h1>
            Columbia<span>Cribs</span>
          </h1>
        </div>
        <div className="hamburger" onClick={toggleMenu}>
          <div className={`hamburger-icon ${isMenuOpen ? "open" : ""}`}>
            <span></span>
            <span></span>
            <span></span>
          </div>
        </div>
      </div>

      {/* Dropdown Menu */}
      <div className={`dropdown-menu ${isMenuOpen ? "show" : ""}`}>
        <nav className="menu-nav">
          <a href="#home" className="menu-item">
            Home
          </a>
          <a href="#buildings" className="menu-item">
            Buildings
          </a>
          <a href="#reviews" className="menu-item">
            Reviews
          </a>
          <a href="#about" className="menu-item">
            About
          </a>
          <a href="#contact" className="menu-item">
            Contact
          </a>
        </nav>
        <div className="menu-footer">
          <button className="btnReview" type="submit">
            Review
          </button>
        </div>
      </div>

      <div className="searchContainer">
        <div className="searchBar">
          <form action="" className="searchForm">
            <input type="text" placeholder="Search a building..." />
            <IoSearchOutline className="searchIcon" />
          </form>
          <button className="btnReview" type="submit">
            Review
          </button>
        </div>
      </div>
    </div>
  );
}

export default Header;
