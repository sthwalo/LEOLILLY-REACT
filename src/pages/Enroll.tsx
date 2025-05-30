import React, { useState, FormEvent } from 'react';
import { EnrollmentFormData } from '../types';

const EnrollPage: React.FC = () => {
  const [formData, setFormData] = useState<EnrollmentFormData>({
    name: '',
    email: '',
    phone: '',
    course: 'Elderly Care Caregiving'
  });
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState({ text: '', type: '' });

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setMessage({ text: '', type: '' });
    
    try {
      const response = await fetch('http://localhost:8000/enroll.php', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });
      
      const data = await response.json();
      
      if (response.ok) {
        setMessage({ text: 'Thank you for enrolling! We will contact you soon.', type: 'success' });
        // Reset form
        setFormData({
          name: '',
          email: '',
          phone: '',
          course: 'Elderly Care Caregiving'
        });
      } else {
        setMessage({ text: data.message || 'Something went wrong. Please try again.', type: 'error' });
      }
    } catch (error) {
      console.error('Enrollment error:', error);
      setMessage({ text: 'Server error. Please try again later.', type: 'error' });
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData((prevState: EnrollmentFormData) => ({
      ...prevState,
      [name]: value
    }));
  };

  return (
    <section id="enroll" className="enroll">
      <h2>Enroll in Our Courses</h2>
      <p>Fill in the form below to register for one of our caregiving courses.</p>
      
      {message.text && (
        <div className={`message ${message.type}`}>
          {message.text}
        </div>
      )}
      
      <form id="enrollment-form" onSubmit={handleSubmit}>
        <label htmlFor="name">Full Name:</label>
        <input 
          type="text" 
          id="name" 
          name="name" 
          value={formData.name}
          onChange={handleChange}
          required 
        />

        <label htmlFor="email">Email Address:</label>
        <input 
          type="email" 
          id="email" 
          name="email" 
          value={formData.email}
          onChange={handleChange}
          required 
        />

        <label htmlFor="phone">Phone Number:</label>
        <input 
          type="tel" 
          id="phone" 
          name="phone" 
          value={formData.phone}
          onChange={handleChange}
          required 
        />

        <label htmlFor="course">Select Course:</label>
        <select 
          id="course" 
          name="course"
          value={formData.course}
          onChange={handleChange}
        >
          <option value="Elderly Care Caregiving">Elderly Care Caregiving</option>
          <option value="Child Minding">Child Minding</option>
          <option value="AU Pair Night Nursing">AU Pair Night Nursing</option>
          <option value="First Aid Level 1">First Aid Level 1</option>
        </select>

        <button type="submit" disabled={loading}>
          {loading ? 'Submitting...' : 'Submit'}
        </button>
      </form>
    </section>
  );
};

export default EnrollPage;
