import logo from "../assets/logo.svg";
import { useState } from "react";
import "./Header.css";
import { IoSearchOutline } from "react-icons/io5";
import { Link, useNavigate } from "react-router-dom";

function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const navigate = useNavigate();

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const goToReviewFlow = () => {
    navigate("/review");
    setIsMenuOpen(false);
  };

  return (
    <div className="header">
      <div className="navBar">
        <div className="logo">
          <img src={logo} alt="Columbia Cribs Logo" />
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
          <Link to="/" className="menu-item">
            Home
          </Link>
          <Link to="/BuildingPage" className="menu-item">
            Buildings
          </Link>
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
          <button className="btnReview" type="button" onClick={goToReviewFlow}>
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
          <button className="btnReview" type="button" onClick={goToReviewFlow}>
            Review
          </button>
        </div>
      </div>
    </div>
  );
}

export default Header;
