import "./Footer.css";

function Footer() {
  return (
    <footer className="footer">
      <div className="footer-content">
        <div className="footer-section">
          <h4>Columbia Cribs</h4>
          <p>Your trusted source for Columbia housing reviews</p>
        </div>
        <div className="footer-section">
          <h4>Quick Links</h4>
          <ul>
            <li>
              <a href="#home">Home</a>
            </li>
            <li>
              <a href="#buildings">Buildings</a>
            </li>
            <li>
              <a href="#about">About</a>
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
