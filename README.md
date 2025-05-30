# My TodoList Application

## Overview
My TodoList is a full-stack web application for managing tasks and to-do items. It features a modern React frontend, a TypeScript backend, and uses SQLite for data persistence. The entire application is containerized using Docker for easy deployment and development.

## Features
- User account creation and authentication
- Create, read, update, and delete tasks
- Mark tasks as complete/incomplete
- Organize tasks by user
- Responsive design works on desktop and mobile devices

## Technology Stack
- **Frontend**: React with TypeScript, built using Vite
- **Backend**: Node.js with TypeScript
- **Database**: SQLite
- **ORM**: Prisma
- **Containerization**: Docker and Docker Compose

## Architecture
The application follows a microservices architecture with three main components:
- **Frontend Service**: Serves the React application on port 80
- **Backend Service**: Provides the API on port 3000
- **Database Service**: SQLite database on port 3306

All services communicate through a dedicated Docker network named `todolist-network`.

## Installation and Setup

### Prerequisites
- Docker and Docker Compose installed on your system
- Git for cloning the repository

### Steps to Run
1. Clone the repository:
   ```bash
   git clone git@github.com:Nogo4/my_todolist.git
   cd my_todolist
   ```

2. Start the application using Docker Compose:
   ```bash
   docker-compose up -d
   ```

3. Access the application:
   - Frontend: http://localhost:80
   - Backend API: http://localhost:3000

## Development

### Project Structure
```
my_todolist/
├── frontend/          # React frontend application
├── backend/           # TypeScript backend API
│   ├── prisma/        # Prisma schema and migrations
│   └── src/           # Backend source code
└── docker-compose.yml # Docker configuration
```

### Local Development
To run the application in development mode:

1. Install dependencies for both frontend and backend:
   ```bash
   cd frontend && npm install
   cd ../backend && npm install
   ```

2. Run the backend:
   ```bash
   cd backend
   bun i
   bun dev
   ```

3. Run the frontend:
   ```bash
   cd frontend
   bun i
   bun dev
   ```

## Database Schema
The application uses a SQLite database with the following models:
- **User**: Stores user information
- **Task**: Stores tasks with a relationship to users

## API Endpoints
The backend exposes the following API endpoints:

- **User Management**:
  - `POST /api/users`: Create a new user
  - `GET /api/users/:id`: Get user information

- **Task Management**:
  - `GET /api/tasks`: Get all tasks for a user
  - `POST /api/tasks`: Create a new task
  - `PUT /api/tasks/:id`: Update a task
  - `DELETE /api/tasks/:id`: Delete a task

## Troubleshooting

### Common Issues
- If services fail to start, check Docker logs:
  ```bash
  docker-compose logs
  ```

- If the frontend can't connect to the backend, verify that all services are running:
  ```bash
  docker-compose ps
  ```

- Database connection issues may require resetting the database container:
  ```bash
  docker-compose down -v
  docker-compose up -d
  ```

## License
This project is licensed under the MIT License - see the LICENSE file for details.
