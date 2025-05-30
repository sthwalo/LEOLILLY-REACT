import React from 'react';

const AboutPage: React.FC = () => {
  return (
    <section className="about-page">
      <div className="container">
        <h1>About LeoLilly Care International</h1>
        
        <div className="about-content">
          <p>
            Founded in 2024 by the children of Leo and Lilly, LeoLilly Care International was created to continue their legacy of caregiving. 
            Through our comprehensive 4-in-1 courses, we provide essential skills for individuals looking to build a career in caregiving, 
            whether it's for elderly care, child minding, AU Pair services, or first aid.
          </p>
          
          <div className="vision-section">
            <h2>Our Vision</h2>
            <p>
              Our vision extends beyond just training caregivers. We are working towards establishing a <strong>home-based care institution</strong>, 
              where families can access personalized caregiving services tailored to their specific needs. This institution will offer full support 
              to both families and professional caregivers, ensuring that loved ones receive compassionate and professional care at home.
            </p>
          </div>
          
          <div className="mission-section">
            <h2>Our Mission</h2>
            <p>
              Our mission is to empower caregivers with the knowledge and skills they need to provide dignified and effective care. 
              LeoLilly Care International aims to be a beacon of hope, creating a community where caregivers can thrive, and families 
              can feel confident in the care their loved ones receive.
            </p>
          </div>
          
          <div className="future-section">
            <h2>Looking Ahead</h2>
            <p>
              Looking ahead, we envision a world where caregiving is not just a profession, but a way to foster love, respect, and community. 
              As we continue to grow, our focus will be on expanding our educational programs and building a network of care that spans across 
              different regions, ensuring that the legacy of Leo and Lilly continues to touch lives worldwide.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutPage;
