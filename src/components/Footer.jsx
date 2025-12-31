import logo from "../assets/logo.svg";
import "./Footer.css";
import { Link, useNavigate, useLocation } from "react-router-dom";

function Footer() {
  return (
    <footer className="footer">
      <div className="footer-content">
        <div className="footer-section">
          <img src={logo} alt="Columbia Cribs Logo" />
          <h1>
            Columbia<span>Cribs</span>
          </h1>
        </div>
        <div className="footer-section">
          <h4>Quick Links</h4>
          <ul>
            <li>
              <Link to='/'>Home</Link>
            </li>
            <li>
              <a href="#buildings">Buildings</a>
            </li>
            <li>
              <Link to='/OurMission'>About Us</Link>
            </li>
            <li>
              <a href="#contact">Contact</a>
            </li>
          </ul>
        </div>
        <div className="footer-section">
          <h4>Connect</h4>
          <ul>
            <li>
              <a href="#facebook">Facebook</a>
            </li>
            <li>
              <a href="#instagram">Instagram</a>
            </li>
            <li>
              <a href="#twitter">Twitter</a>
            </li>
          </ul>
        </div>
      </div>
      <div className="footer-bottom">
        <p>&copy; 2024 Columbia Cribs. All rights reserved.</p>
      </div>
    </footer>
  );
}

export default Footer;
