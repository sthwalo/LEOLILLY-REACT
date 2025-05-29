import React, { useState } from 'react';
import { GalleryImage, getYears, getCategories, filterImages } from '../data/galleryData';

interface ImageModalProps {
  image: GalleryImage;
  onClose: () => void;
}

const ImageModal: React.FC<ImageModalProps> = ({ image, onClose }) => {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const images = image.images || [image.url];

  const handleNextImage = () => {
    setCurrentImageIndex((prevIndex) => (prevIndex + 1) % images.length);
  };

  const handlePrevImage = () => {
    setCurrentImageIndex((prevIndex) => 
      prevIndex === 0 ? images.length - 1 : prevIndex - 1
    );
  };

  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <button onClick={onClose} className="close-button">
          ×
        </button>
        <div className="modal-image-container">
          <img 
            src={images[currentImageIndex]} 
            alt={image.title} 
            className="modal-image" 
          />
        </div>
        {images.length > 1 && (
          <div className="modal-navigation">
            <button onClick={handlePrevImage} className="nav-button prev-button">
              &lt;
            </button>
            <button onClick={handleNextImage} className="nav-button next-button">
              &gt;
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

const GalleryPage: React.FC = () => {
  const [selectedYear, setSelectedYear] = useState(getYears()[0]);
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [selectedImage, setSelectedImage] = useState<GalleryImage | null>(null);

  const years = getYears();
  const categories = getCategories(selectedYear);
  const filteredImages = filterImages(selectedYear, selectedCategory);

  const handleYearChange = (year: string) => {
    setSelectedYear(year);
    setSelectedCategory('All');
  };

  return (
    <section className="gallery">
      <h1>Our Gallery</h1>
      <p>Celebrating our graduates and their achievements</p>
      
      <div className="container">
        {/* Year Tabs */}
        <div className="year-tabs">
          {years.map((year) => (
            <button
              key={year}
              onClick={() => handleYearChange(year)}
              className={`year-tab ${selectedYear === year ? 'active' : ''}`}
            >
              {year}
            </button>
          ))}
        </div>

        {/* Category Filters */}
        <div className="category-filters">
          {categories.map((category) => (
            <button
              key={category}
              onClick={() => setSelectedCategory(category)}
              className={`category-button ${selectedCategory === category ? 'active' : ''}`}
            >
              {category}
            </button>
          ))}
        </div>

        {/* Gallery Grid */}
        <div className="gallery-grid">
          {filteredImages.map((image) => (
            <div
              key={image.id}
              onClick={() => setSelectedImage(image)}
              className="gallery-item"
            >
              <img
                src={image.url}
                alt={image.title}
                className="gallery-image"
              />
              <h3>{image.title}</h3>
              <p className="category-tag">{image.category}</p>
              {image.testimony && <p className="testimony">"{image.testimony}"</p>}
            </div>
          ))}
        </div>
      </div>

      {/* Modal Component */}
      {selectedImage && <ImageModal image={selectedImage} onClose={() => setSelectedImage(null)} />}
    </section>
  );
};

export default GalleryPage;
