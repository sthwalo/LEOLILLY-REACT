import React from 'react';
import { Link } from 'react-router-dom';

const HomePage: React.FC = () => {
  return (
    <>
      {/* Hero Section */}
      <section className="hero" id="home">
        <h2>Legacy Building Through Caregiving</h2>
        <p>Join our 4-in-1 Caregiver Combo Courses and start your career in caregiving today!</p>
        <p><strong>Total Cost: R2000 for all courses</strong></p>
        <Link to="/enroll" className="cta-button">Enroll Now</Link>
        <a href="https://wa.me/27743809752" className="whatsapp-button">Have questions? Chat with us on WhatsApp!</a>
      </section>

      {/* Courses Section */}
      <section className="courses" id="courses">
        <div className="container">
          <h3>Our Courses</h3>
          <p>Explore our comprehensive courses designed to help you build a legacy in caregiving.</p>
          <Link to="/courses" className="cta-button">See More</Link>
        </div>
      </section>

      {/* Success Stories Section */}
      <section className="top-students">
        <div className="container">
          <h1>Success Stories</h1>
          <div className="student">
            <img src="/img/Final Logo .png" alt="Student 1" />
            <h3>John Doe</h3>
            <p>"LeoLilly Care International helped me build a successful caregiving career!"</p>
          </div>
          <div className="student">
            <img src="/img/Final Logo .png" alt="Student 2" />
            <h3>Jane Smith</h3>
            <p>"The training I received made me confident and prepared for my caregiving role."</p>
          </div>
        </div>
      </section>

      {/* About Section */}
      <section className="about">
        <div className="container">
          <h1>About LeoLilly Care International</h1>
          <p>Founded in 2024 by the children of Leo and Lilly, we aim to build a legacy of caregiving through our comprehensive 4-in-1 courses, providing essential skills for those looking to work in the caregiving field.</p>
        </div>
      </section>
    </>
  );
};

export default HomePage;
