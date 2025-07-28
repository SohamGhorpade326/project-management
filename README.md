PixelForge Nexus
PixelForge Nexus is a secure, full-stack web application designed as a project management system for a fictional game development company, "Creative SkillZ LLC". Built with the MERN stack, its primary purpose is to provide a centralized platform for managing projects, teams, and documents while enforcing a strict, role-based security model.

✨ Features
Role-Based Access Control: Three distinct user roles (Admin, Project Lead, Developer) with specific permissions.

Secure Authentication: User login system secured with JSON Web Tokens (JWT) and password hashing using bcrypt.

Project Management: Admins can create, delete, and manage the lifecycle of projects.

Team Management: Admins can create and delete user accounts. Project Leads can assign and unassign developers to their specific projects.

Document Management: Authorized users can upload and delete project-related documents.

Dynamic UI: The user interface, built with React, dynamically changes to show only the information and controls relevant to the logged-in user's role.

🛠️ Tech Stack
Frontend:

React (with Vite)

Tailwind CSS

Axios

Backend:

Node.js

Express.js

MongoDB (with Mongoose)

Authentication & Security:

JSON Web Tokens (JWT)

bcrypt.js

🚀 Getting Started
Follow these instructions to set up and run the project on your local machine.

Prerequisites
Node.js (v18 or later)

npm

MongoDB (local installation or a cloud service like MongoDB Atlas)

Installation & Setup
Clone the repository:

Bash

git clone https://github.com/your-username/your-repository-name.git
cd your-repository-name
Install Backend Dependencies:

Bash

cd server
npm install
Install Frontend Dependencies:

Bash

cd ../client
npm install
Environment Variables
The backend server requires environment variables for the database connection and security keys.

In the server directory, create a file named .env.

Copy the contents of server/.env.example into your new .env file.

Fill in your specific values for MONGO_URI and JWT_SECRET.

server/.env file:

Code snippet

MONGO_URI=your_mongodb_connection_string_goes_here
JWT_SECRET=your_super_secret_key_for_jwt_goes_here
PORT=5001
📜 Available Scripts
Seeding the Database
Before running the application for the first time, you need to seed the database with initial user accounts for each role.

Navigate to the server directory.

Run the seeder script:

Bash

node seeder.js
Running the Application
You will need two separate terminals to run both the backend and frontend servers.

Run the Backend Server:

In a terminal, navigate to the server directory.

Run the command:

Bash

node index.js
The server will be running on http://localhost:5001.

Run the Frontend Client:

In a new terminal, navigate to the client directory.

Run the command:

Bash

npm run dev
Open your browser and navigate to http://localhost:5173 (or the URL provided in the terminal).

👤 User Roles & Credentials
The seeder script creates the following default users. You can log in as the Admin to create more users.

Admin:

Username: admin

Password: 123456

