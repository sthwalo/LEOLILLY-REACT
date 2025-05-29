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
            <img src="/img/success/child.jpeg" alt="Student 1" className="student-image home-student-image" />
            <h3>Tendai Mzanywa</h3>
            <p>"LeoLilly Care International helped me Develop essential skills for caring for children of various ages, including safety protocols, developmental activities, and positive discipline techniques."</p>
          </div>
          <div className="student">
            <img src="/img/success/PHOTO-2025-05-18-07-38-11.jpg" alt="Student 2" className="student-image home-student-image" />
            <h3>Tendai Mzanywa</h3>
            <p>"The training I received made me confident and prepared to start my pre-school."</p>
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
