import "./Footer.css"; // Ensure to style accordingly
import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <div className="footer-container">
      <footer className="footer">
        <div className="footer-content">
          {/* Logo */}
          <div className="footer-logo">
            <img src="src/images/syncsafe_logo.png" alt="SyncSafe Logo" className="logo-img" />
          </div>

          {/* Columns */}
          <div className="footer-sections">
            {/* About */}
            <div className="footer-section">
              <h5>SyncSafe</h5>
              <ul>
                <li><Link to="/services">About Us</Link></li>
                <li><a href="#threat-intelligence">Threat Intelligence</a></li>
                <li><Link to="/maininfo">Security Practices</Link></li>
                <li><Link to="/contact">Contact Support</Link></li>
              </ul>
            </div>

            {/* Resources */}
            <div className="footer-section">
              <h5>Resources</h5>
              <ul>
                <li><a href="#docs">Documentation</a></li>
                <li><a href="#blog">Cybersecurity Blog</a></li>
                <li><a href="#api">API Reference</a></li>
                <li><a href="#careers">Careers</a></li>
              </ul>
            </div>

            {/* Newsletter */}
            <div className="footer-section">
              <h5>Stay Updated</h5>
              <p>Subscribe to our cybersecurity insights.</p>
              <div className="newsletter">
                <input type="email" placeholder="Enter your email" />
                <button type="submit">Subscribe</button>
              </div>
            </div>
          </div>
        </div>

        {/* Copyright */}
        <div className="footer-bottom">
          <p>© {new Date().getFullYear()} SyncSafe. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
};

export default Footer;

