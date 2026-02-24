import React from 'react';
import { FaFacebook, FaTiktok, FaInstagram, FaWhatsapp } from 'react-icons/fa';

const Footer: React.FC = () => {
  return (
    <footer className="footer">
      <div className="footer-content">
        <p>Contact Us: +27 73 354 4713 | +27 82 689 2182 ,<br />
        <a href="mailto:admin@leolilly.org">admin@leolilly.org</a></p>
        <p>Address: 39 Ronbex Road, Activia Park,  Germiston, 1429 South Africa</p>
        <p>About Us: LeoLilly Care International was founded in 2024 by the children of Leo and Lilly as a legacy-building institution.</p>
        <p>FAQ: For more information, visit our FAQ page.</p>
        <div className="social-media-links">
          <p>Follow Us:</p>
          <div className="social-icons">
            <a href="https://www.facebook.com/share/1Wjd1dyHZo/" target="_blank" rel="noopener noreferrer" aria-label="Facebook" className="social-icon">
              <FaFacebook size={24} />
            </a>
            <a href="https://tiktok.com/@leolilly.care.inte" target="_blank" rel="noopener noreferrer" aria-label="TikTok" className="social-icon">
              <FaTiktok size={24} />
            </a>
            <a href="https://www.instagram.com/leoliliancare24/" target="_blank" rel="noopener noreferrer" aria-label="Instagram" className="social-icon">
              <FaInstagram size={24} />
            </a>
          </div>
        </div>
      </div>
      <a href="https://wa.me/27672594463" className="whatsapp-button-footer">
        <FaWhatsapp size={20} style={{ marginRight: '8px' }} />
        Chat with us on WhatsApp!
      </a>
    </footer>
  );
};

export default Footer;
