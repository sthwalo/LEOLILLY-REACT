# LeoLilly Care International - React TypeScript Website

This project is a React TypeScript conversion of the original LeoLilly Care International website. It features improved structure, modern coding practices, and a new Gallery page to showcase graduates.

## Features

- Fully responsive design
- TypeScript for improved type safety and developer experience
- React Router for navigation
- Component-based architecture
- New Gallery page showcasing graduates from 2023, 2024, and 2025

## Pages

- **Home**: Introduction to LeoLilly Care International, featuring a hero section, brief course overview, success stories, and about information.
- **Courses**: Detailed information about the 4-in-1 caregiver combo courses offered.
- **Enroll**: A form for prospective students to register for courses.
- **Gallery**: Showcasing graduates from 2023, 2024, and 2025.

## Getting Started

### Prerequisites

- Node.js (v14 or later)
- npm 
### Installation

1. Clone the repository
2. Navigate to the project directory
3. Install dependencies:

```bash
npm install
# or
yarn install
```

### Running the Application

```bash
npm start


This will start the development server at http://localhost:3000.

### Building for Production

```bash
npm run build


This will create a production-ready build in the `build` folder.

## Project Structure

```
/src
  /components - Reusable components (Header, Footer, etc.)
  /pages - Page components for each route
  /styles - CSS files
  App.tsx - Main app component with routing
  index.tsx - Entry point
/public
  /img - Images including logo
  index.html - HTML template
  manifest.json - PWA manifest
```

## Technology Stack

- React
- TypeScript
- React Router
- CSS (with possibility to extend to Styled Components or other CSS-in-JS solutions)

## Server Configuration

The website includes a PHP backend for the enrollment form. The server directory contains:

- `enroll.php` - Main enrollment form handler
- `.env` - Environment configuration (copy from .env.example)
- `vendor/` - PHP dependencies (PHPMailer)
- `logs/` - Directory for log files

### Setting Up the Server

1. Navigate to the server directory
2. Copy `.env.example` to `.env`
3. Update the `.env` file with your email credentials
4. Ensure the logs directory exists and is writable

## Deployment

### Manual Deployment

1. Build the React application:
   ```bash
   npm run build
   ```

2. Copy the contents of the `build` directory to your web server
3. Copy the `server` directory to your web server
4. Configure your web server to serve the React app and handle PHP requests

### Using the Deployment Script

A deployment script is included to automate the process:

1. Make the script executable:
   ```bash
   chmod +x deploy_script.sh
   ```

2. Run the script:
   ```bash
   ./deploy_script.sh
   ```

3. Follow the prompts to enter your FTP credentials

## Future Enhancements

- Add a blog section for updates and articles
- Add more interactive elements to the courses page
- Enhance the gallery with filtering options
