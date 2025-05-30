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
    title: 'Graduation',
    url: '/img/Team/may255.jpg',
    category: 'Graduation',
    year: 'May 25',
    images: [
      '/img/Team/may251.jpg',
      '/img/Team/may252.jpg',
      '/img/Team/may253.jpg',
      '/img/Team/may254.jpg',
      '/img/Team/may255.jpg',
      '/img/Team/may256.jpg',
      '/img/Team/may257.jpg',
    ]
  },
  /*{
    id: '2024-2',
    title: 'Elderly Care Training',
    url: '/img/2024/elderly1.jpg',
    category: 'Training',
    year: '2024',
    images: [
      '/img/2024/elderly1.jpg',
      '/img/2024/elderly2.jpg'
    ]
  },
  */
  {
    id: '2024-3',
    title: 'Graduation',
    url: '/img/Feb25/feb251.jpeg',
    category: 'Graduation',
    year: 'Feb 25',
    images: [
      '/img/Feb25/feb251.jpeg',
      '/img/Feb25/feb252.jpeg',
      '/img/Feb25/feb253.jpeg',
      '/img/Feb25/feb254.jpeg',
      '/img/Feb25/feb255.jpeg',
    ]
  },
  /*{
    id: '2024-4',
    title: 'First Aid Training',
    url: '/img/2024/firstaid1.jpg',
    category: 'Training',
    year: '2024',
    images: [
      '/img/2024/firstaid1.jpg',
      '/img/2024/firstaid2.jpg'
    ]
  },
  */
  // 2023 Images
  {
    id: '2023-1',
    title: 'Graduation',
    url: '/img/Nov24/nov241.jpeg',
    category: 'Graduation',
    year: 'Nov 24',
    images: [
      '/img/Nov24/nov241.jpeg',
      '/img/Nov24/nov242.jpeg',
      '/img/Nov24/nov243.jpeg',
      '/img/Nov24/nov244.jpeg',
      '/img/Nov24/nov245.jpeg',
      '/img/Nov24/nov246.jpeg',
      '/img/Nov24/nov247.jpeg',
      '/img/Nov24/nov248.jpeg',
      '/img/Nov24/nov249.jpeg',
      '/img/Nov24/nov2410.jpeg',
      '/img/Nov24/nov2411.jpeg'
    ]
  },
  /*{
    id: '2023-2',
    title: 'Practical Training',
    url: '/img/2023/training1.jpg',
    category: 'Training',
    year: '2023',
    images: [
      '/img/2023/training1.jpg'
    ]
  },
  {
    id: '2023-3',
    title: 'Community Outreach',
    url: '/img/2023/community1.jpg',
    category: 'Community',
    year: '2023',
    images: [
      '/img/2023/community1.jpg',
      '/img/2023/community2.jpg'
    ]
  }
    */
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