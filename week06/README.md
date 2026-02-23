# Week 06 - Coding a RESTful API

This folder contains an Express REST API implementation for two resources from Week 5:
- `users`
- `tasks`

## Setup

From `week06/` run:

```bash
npm install
npm start
```

Server default URL: `http://localhost:3000`

## Implemented Endpoints

### Users
- `GET /users`
- `GET /users/:id`
- `POST /users`
- `PATCH /users/:id`
- `DELETE /users/:id`

### Tasks
- `GET /tasks` (supports `?page=1&limit=10`)
- `GET /tasks/:id`
- `POST /tasks`
- `PATCH /tasks/:id`
- `DELETE /tasks/:id`

## Required Behavior Covered
- Global JSON parsing: `app.use(express.json())`
- Global custom request logger middleware (`middleware/logger.js`)
- Global 404 handler with assignment error shape
- Error format:

```json
{
	"error": {
		"code": "SOME_CODE",
		"message": "Human readable message"
	}
}
```

- Error responses implemented for `400`, `404`, and `409`
- Pagination metadata returned on `GET /tasks`

## Postman Screenshot Checklist

Place screenshots in `week06/screenshots/` and use these names:

1. `01-get-users.png`
2. `02-get-user-by-id.png`
3. `03-post-user.png`
4. `04-patch-user.png`
5. `05-delete-user.png`
6. `06-get-tasks-paginated.png`
7. `07-get-task-by-id.png`
8. `08-post-task.png`
9. `09-patch-task.png`
10. `10-delete-task.png`

Include the full Postman window in each screenshot so both request input and response output are visible.
