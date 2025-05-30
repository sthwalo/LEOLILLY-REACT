import React from 'react';
import { Link } from 'react-router-dom';
import { Course } from '../types';

interface CourseItemProps {
  course: Course;
}

const CourseItem: React.FC<CourseItemProps> = ({ course }: CourseItemProps) => {
  const { title, description, duration, level } = course;
  
  return (
    <div className="course-item">
      <h3>{title}</h3>
      <p>{description}</p>
      <div className="course-details">
        <span className="duration">Duration: {duration}</span>
        <span className="level">Level: {level}</span>
      </div>
      <Link to="/enroll" className="cta-button">Enroll Now</Link>
    </div>
  );
};

const CoursesPage: React.FC = () => {
  const courses: Course[] = [
    {
      title: 'Elderly Care Caregiving',
      description: 'Learn comprehensive skills for providing care to elderly individuals, including mobility assistance, medication management, and creating a supportive environment.',
      duration: '12 weeks',
      level: 'Beginner to Intermediate'
    },
    {
      title: 'Child Minding',
      description: 'Develop essential skills for caring for children of various ages, including safety protocols, developmental activities, and positive discipline techniques.',
      duration: '8 weeks',
      level: 'Beginner'
    },
    {
      title: 'AU Pair Night Nursing',
      description: 'Specialized training for overnight care of infants and children, covering sleep routines, emergency responses, and creating a secure nighttime environment.',
      duration: '10 weeks',
      level: 'Intermediate'
    },
    {
      title: 'First Aid Level 1',
      description: 'Essential first aid skills for caregivers, including CPR, wound care, handling medical emergencies, and injury prevention in caregiving settings.',
      duration: '4 weeks',
      level: 'All Levels'
    }
  ];

  return (
    <section id="courses" className="courses">
      <h2>Our Caregiving Courses</h2>
      <div className="course-grid">
        {courses.map((course: Course, index) => (
          <CourseItem key={index} course={course} />
        ))}
      </div>
    </section>
  );
};

export default CoursesPage;
