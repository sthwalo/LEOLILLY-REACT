export interface GalleryImage {
  id: string;
  title: string;
  url: string;
  category: string;
  year: string;
  images?: string[];
    testimony?: string;
}

const galleryData: GalleryImage[] = [
  {
    id: '2024-1',
    title: 'Sophia Adams',
    url: '/img/2024/graduate.jpg',
    category: 'Graduates',
    year: '2024',
    testimony: 'Already putting my caregiving skills to great use!'
  },
  {
    id: '2024-2',
    title: 'John Smith',
    url: '/img/2024/graduate.jpg',
    category: 'Graduates',
    year: '2024',
    testimony: 'The training I received was excellent and prepared me well for my new career.'
  },
  {
    id: '2024-3',
    title: 'Maria Johnson',
    url: '/img/2024/graduate.jpg',
    category: 'Graduates',
    year: '2024',
    testimony: 'I learned so much during my time at LeoLilly Care International!'
  },
  {
    id: '2024-4',
    title: 'David Williams',
    url: '/img/2024/graduate.jpg',
    category: 'Graduates',
    year: '2024',
    testimony: 'The instructors were knowledgeable and supportive throughout the course.'
  }
];

export const getYears = (): string[] => {
  const years = Array.from(new Set(galleryData.map(image => image.year)));
  return years.sort((a, b) => parseInt(b) - parseInt(a));
};

export const getCategories = (year: string): string[] => {
  const categories = Array.from(
    new Set(galleryData.filter(img => img.year === year).map(img => img.category))
  );
  return ['All', ...categories];
};

export const filterImages = (year: string, category: string): GalleryImage[] => {
  return galleryData.filter(image => 
    image.year === year && 
    (category === 'All' || image.category === category)
  );
};