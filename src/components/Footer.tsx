import React from 'react';

const Footer: React.FC = () => {
  return (
    <footer className="footer">
      <div className="footer-content">
        <p>Contact Us: +27 73 354 4713 | +27 82 689 2182 ,<br />
        <a href="mailto:admin@leolilly.org">admin@leolilly.org</a></p>
        <p>Address: 39 Ronbex Road, Activia Park,  Germiston, 1429 South Africa</p>
        <p>About Us: LeoLilly Care International was founded in 2024 by the children of Leo and Lilly as a legacy-building institution.</p>
        <p>FAQ: For more information, visit our FAQ page.</p>
      </div>
      <a href="https://wa.me/27743809752" className="whatsapp-button-footer">Chat with us on WhatsApp!</a>
    </footer>
  );
};

export default Footer;
