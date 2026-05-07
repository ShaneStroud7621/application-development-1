# Week 08 RESTful API

## Project Overview

This is a RESTful API for managing tasks and users in a simple task management system. It allows developers and applications to create, read, update, and delete tasks and users through HTTP endpoints.

### Target Users
- Developers building task management applications
- Frontend applications needing backend API for CRUD operations
- API consumers requiring programmatic access to task and user data

### Core Resources
- **Tasks**: Represent individual tasks with title, status, and assignee
- **Users**: Represent users who can be assigned to tasks

## Setup Instructions

### Requirements
- Node.js 18+

### Installation
```bash
npm install
```

### Starting the Server
```bash
npm start
```

The server will start on port 3000 by default.

### Environment Variables
- `PORT`: Port number for the server (default: 3000)

## API Overview

| Method | Endpoint       | Description              |
|--------|----------------|--------------------------|
| GET    | /tasks         | Retrieve all tasks       |
| GET    | /tasks/:id     | Retrieve a specific task |
| POST   | /tasks         | Create a new task        |
| PATCH  | /tasks/:id     | Update a task            |
| DELETE | /tasks/:id     | Delete a task            |
| GET    | /users         | Retrieve all users       |
| GET    | /users/:id     | Retrieve a specific user |
| POST   | /users         | Create a new user        |
| PATCH  | /users/:id     | Update a user            |
| DELETE | /users/:id     | Delete a user            |

## Example Requests

### ✅ Successful POST /tasks
```json
POST /tasks
Content-Type: application/json
X-API-Key: 12345

{
  "title": "Finish assignment"
}
```

Response:
```json
{
  "data": {
    "id": 3,
    "title": "Finish assignment",
    "status": "open",
    "assigneeId": null
  }
}
```

### ❌ Validation Error
```json
POST /tasks
Content-Type: application/json
X-API-Key: 12345

{
  "title": ""
}
```

Response:
```json
{
  "error": {
    "code": "INVALID_INPUT",
    "message": "Field \"title\" is required and must be a string"
  }
}
```

### ❌ Unauthorized Error
```json
POST /tasks
Content-Type: application/json

{
  "title": "Finish assignment"
}
```

Response:
```json
{
  "error": {
    "code": "UNAUTHORIZED",
    "message": "Missing or invalid API key"
  }
}
```