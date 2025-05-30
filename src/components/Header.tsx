import React from 'react';
import { Link, useLocation } from 'react-router-dom';

const Header: React.FC = () => {
  const location = useLocation();

  return (
    <header className="header">
      <div className="logo-container">
        <img src="/img/Logo.png" alt="LeoLilly Care International Logo" className="logo-image" />
      </div>
      <nav>
        <ul>
          <li>
            <Link to="/" className={location.pathname === '/' ? 'active' : ''}>
              Home
            </Link>
          </li>
          <li>
            <Link to="/about" className={location.pathname === '/about' ? 'active' : ''}>
              About
            </Link>
          </li>
          <li>
            <Link to="/courses" className={location.pathname === '/courses' ? 'active' : ''}>
              Courses
            </Link>
          </li>
          <li>
            <Link to="/enroll" className={location.pathname === '/enroll' ? 'active' : ''}>
              Enroll
            </Link>
          </li>
          <li>
            <Link to="/gallery" className={location.pathname === '/gallery' ? 'active' : ''}>
              Gallery
            </Link>
          </li>
        </ul>
      </nav>
    </header>
  );
};

export default Header;
