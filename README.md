UAT Scheduler

A React-based scheduling application built with Vite that allows users to create, view, edit, and delete scheduled events through an intuitive interface.
Project Overview
This application provides a scheduling system with two main components:

SchedulerForm: A form interface for creating and submitting new schedule entries
SchedulerCalendar: A calendar view that displays logged schedules and allows for editing and deletion of existing entries

Technology Stack

Frontend:

React (with Vite)
HMR (Hot Module Replacement)
ESLint for code quality


Project Structure
uat-scheduler-frontend/
├── dist/                  # Build output directory
│   └── vite.svg
├── node_modules/          # Node dependencies
├── public/                # Public assets
├── src/                   # Source code
│   ├── assets/            # Static assets
│   ├── components/        # React components
│   │   ├── SchedulerCalendar.jsx  # Calendar component for viewing/editing schedules
│   │   └── SchedulerForm.jsx      # Form component for creating schedules
│   ├── pages/             # Page components
│   ├── App.css            # Main app styles
│   ├── App.jsx            # Main application component
│   ├── index.css          # Global CSS
│   └── main.jsx           # Entry point
├── .gitignore             # Git ignore file
├── eslint.config.js       # ESLint configuration
├── index.html             # HTML entry point
├── package-lock.json      # NPM lock file
├── package.json           # Project dependencies and scripts
├── README.md              # Project documentation
├── server.js              # Express server (if applicable)
└── vite.config.js         # Vite configuration
Key Components
SchedulerForm.jsx
The SchedulerForm component provides:

A user interface to create new scheduled events
Form validation and submission functionality
POST request handling to save new schedules to the backend

Usage example:
jsx<SchedulerForm onSubmitSuccess={handleFormSubmission} />
SchedulerCalendar.jsx
The SchedulerCalendar component offers:

Calendar view of all scheduled events
Ability to view schedule details
Edit functionality for existing schedules
Delete option to remove scheduled events
Filtering capabilities

Usage example:
jsx<SchedulerCalendar 
  schedules={scheduleData} 
  onEdit={handleEditSchedule} 
  onDelete={handleDeleteSchedule} 
/>
Getting Started
Prerequisites

Node.js (v14.x or higher)
npm or yarn

Installation

Clone the repository:
bashgit clone https://github.com/yourusername/uat-scheduler-frontend.git
cd uat-scheduler-frontend

Install dependencies:
bashnpm install

Start the development server:
bashnpm run dev

Access the application at http://localhost:5173

Build for Production
bashnpm run build
The build files will be generated in the dist directory.
Preview Production Build
bashnpm run preview
Development Notes

This project uses Vite for fast refresh and development experience
Two official Vite plugins are used:

@vitejs/plugin-react using Babel for Fast Refresh
@vitejs/plugin-react-swc using SWC for Fast Refresh


For enhanced development, consider using TypeScript with the TS template and typescript-eslint

Backend Integration
The frontend communicates with an Express.js backend server that handles:

Storing schedule data
Retrieving schedule entries
Updating existing schedules
Deleting schedules

Features

Create Schedule: Submit new schedule entries through the SchedulerForm
View Schedules: See all schedules displayed on the calendar
Edit Schedule: Modify existing schedule details
Delete Schedule: Remove unwanted schedule entries
Responsive Design: Works on various device sizes

License
This project is licensed under the MIT License - see the LICENSE file for details.