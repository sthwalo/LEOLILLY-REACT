// Common types used throughout the application

// Course type definition
export interface Course {
  title: string;
  description: string;
  image: string;
  duration: string;
  level: string;
}

// Graduate type for the gallery
export interface Graduate {
  name: string;
  year: string;
  image: string;
  testimony?: string;
}

// Enrollment form data type
export interface EnrollmentFormData {
  name: string;
  email: string;
  phone: string;
  course: string;
}
