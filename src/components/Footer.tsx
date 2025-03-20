import React from 'react';

const Footer: React.FC = () => {
  return (
    <footer className="footer">
      <div className="footer-content">
        <p>Contact Us: +27 73 354 4713 | <a href="mailto:admin@leolilly.org">admin@leolilly.org</a></p>
        <p>Address: 1006 Blauwberg Building, 22 Kapteijn Street, Hillbrow, Johannesburg, 2001</p>
        <p>About Us: LeoLilly Care International was founded in 2024 by the children of Leo and Lilly as a legacy-building institution.</p>
        <p>FAQ: For more information, visit our FAQ page.</p>
      </div>
      <a href="https://wa.me/27743809752" className="whatsapp-button-footer">Chat with us on WhatsApp!</a>
    </footer>
  );
};

export default Footer;
