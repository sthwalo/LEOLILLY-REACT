import React from 'react';
import { Graduate } from '../types';

interface GraduateItemProps extends Graduate {}

const GraduateItem: React.FC<GraduateItemProps> = ({ name, image, testimony }: GraduateItemProps) => {
  return (
    <div className="gallery-item">
      <img src={image} alt={`${name}'s graduation`} />
      <h3>{name}</h3>
      {testimony && <p>"{testimony}"</p>}
    </div>
  );
};

const GalleryPage: React.FC = () => {
  // Sample graduate data for each year
  // In a real application, this would likely come from an API or database
  const graduates2023: Graduate[] = [
    {
      name: 'Sarah Johnson',
      year: '2023',
      image: '/img/Final Logo .png', // Using logo as placeholder
      testimony: 'The caregiving program gave me the skills I needed for my career.'
    },
    {
      name: 'Michael Brown',
      year: '2023',
      image: '/img/Final Logo .png',
      testimony: 'I now work at a top care facility thanks to LeoLilly.'
    },
    {
      name: 'Jessica Lee',
      year: '2023',
      image: '/img/Final Logo .png',
      testimony: 'The First Aid training has been invaluable in my work.'
    }
  ];

  const graduates2024: Graduate[] = [
    {
      name: 'David Wilson',
      year: '2024',
      image: '/img/Final Logo .png',
      testimony: 'LeoLilly opened career doors I never thought possible.'
    },
    {
      name: 'Anna Martinez',
      year: '2024',
      image: '/img/Final Logo .png',
      testimony: 'The child-minding course taught me so much about ECD.'
    },
    {
      name: 'Robert Taylor',
      year: '2024',
      image: '/img/Final Logo .png',
      testimony: 'Learning AU Pair Night Nursing changed my life.'
    },
    {
      name: 'Emily Davis',
      year: '2024',
      image: '/img/Final Logo .png',
      testimony: 'I now have the confidence to provide quality elderly care.'
    }
  ];

  const graduates2025: Graduate[] = [
    {
      name: 'Sophia Adams',
      year: '2025',
      image: '/img/Final Logo .png',
      testimony: 'Already putting my caregiving skills to great use!'
    },
    {
      name: 'James Nelson',
      year: '2025',
      image: '/img/Final Logo .png',
      testimony: 'The comprehensive training has prepared me for any situation.'
    }
  ];

  return (
    <section className="gallery">
      <h1>Our Graduates</h1>
      
      {/* 2025 Graduates */}
      <div className="graduation-year">
        <h2>Class of 2025</h2>
        <div className="gallery-grid">
          {graduates2025.map((graduate, index) => (
            <GraduateItem 
              key={index}
              {...graduate}
            />
          ))}
        </div>
      </div>
      
      {/* 2024 Graduates */}
      <div className="graduation-year">
        <h2>Class of 2024</h2>
        <div className="gallery-grid">
          {graduates2024.map((graduate, index) => (
            <GraduateItem 
              key={index}
              {...graduate}
            />
          ))}
        </div>
      </div>
      
      {/* 2023 Graduates */}
      <div className="graduation-year">
        <h2>Class of 2023</h2>
        <div className="gallery-grid">
          {graduates2023.map((graduate, index) => (
            <GraduateItem 
              key={index}
              {...graduate}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default GalleryPage;
