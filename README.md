# Task Management App

A simple task management application where users can register, log in, and manage their tasks. The frontend is built with React and Vite. It connects to a Node.js and Express backend with a PostgreSQL database.

---

## Setup and Run Instructions

### Backend

- Make sure PostgreSQL is installed and running
- Go into the backend folder and run `npm install`
- Create a `.env` file in the backend folder and add these values
  - DB_NAME=task_db
  - DB_USER=postgres_username
  - DB_PASSWORD=postgres_password
  - DB_HOST=localhost
  - JWT_SECRET=secret_key
  - ACCESS_TOKEN_EXPIRY=1d
  - PORT=5000
- Create the database manually in PostgreSQL with the name task_db
- Run `npm run migrate` to create the tables
- Run `npm run dev` to start the server
- The backend runs on http://localhost:5000

### Frontend

- Go into the frontend folder and run `npm install`
- Run `npm run dev` to start the app
- The app runs on http://localhost:5173
- The backend must be running before opening the app

---

## Architecture Explanation

### Frontend

- The app uses React with React Router for page navigation
- All API calls go through a single Axios instance in `src/api/axiosInstance.jsx`
- The Axios instance has a request interceptor that reads the JWT token from localStorage and attaches it to every request automatically
- API functions are organized in `src/services/` with separate files for auth and task calls
- Reusable UI components like TaskCard, TaskModal, Navbar, and SearchTask are in `src/components/`
- Pages like the Dashboard and landing pages are in `src/views/`
- Route definitions including protected routes are in `src/routes/`
- The logged-in user state is stored at the top level in App.jsx and loaded from localStorage on startup

### Backend

- Routes are defined in `routes/` with separate folders for auth and task endpoints
- Controllers in `controller/` handle the request and response logic
- Business logic sits in `services/`
- Database models for User and Task are in `models/` using Sequelize ORM
- JWT authentication is checked in `middlewares/authMiddleware.js` for protected routes
- Incoming request bodies are validated against Joi schemas in `validator/`
- A global error handler in `utils/` catches all errors and returns consistent responses
- Database schema is managed through Sequelize CLI migrations in `migrations/`
- All API routes are prefixed with `/api`

---

## API Endpoints

### Auth

- POST /api/auth/register — Register a new user
- POST /api/auth/login — Login and receive a JWT token

### Tasks

All task endpoints require a valid JWT token in the Authorization header.

- POST /api/task/create-task — Create a new task
- POST /api/task/get-all-task — Get all tasks with optional filters like status, priority, and search
- PUT /api/task/update-task/:id — Update a task by its ID
- DELETE /api/task/remove-task/:id — Delete a task by its ID
- GET /api/task/get-task-stats — Get task statistics and summary counts

