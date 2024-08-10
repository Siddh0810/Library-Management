import React from 'react';
import '../css/Footer.css';

function Footer() {
  return (
    <footer className="footer">
      <div className="footer-content">
        <div className="about">
          <h3>About Us</h3>
          <p>Streamline your library's operations with our user-friendly library management system, making book organization and circulation a breeze.</p>
        </div>
        <div className="contact">
          <h3>Contact Us</h3>
          <p>Email: library@gmail.com</p>
          <p>Phone: (+91) 8733-494-355</p>
        </div>
        <div className="location">
          <h3>Location</h3>
          <p>1234 Wall Street, <br/> Ahmedabad, Gujarat, <br/> India</p>
        </div>
        <div className="newsletter">
          <h3>Subscribe to Our Newsletter</h3>
          <form>
            <input type="email" placeholder="Your Email" />
            <button type="submit">Subscribe</button>
          </form>
        </div>
      </div>
      <div className="social-media">
        <h3>Follow Us</h3>
        <a href="#" className="social-link">Facebook</a>
        <a href="#" className="social-link">Twitter</a>
        <a href="#" className="social-link">Instagram</a>
      </div>
    </footer>
  );
}

export default Footer;
