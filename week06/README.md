# Week 06 - Express REST API

This project implements the Week 05 API contract using Express with:

- 2 resources: `users`, `tasks`
- 10 required CRUD endpoints
- in-memory storage
- custom request logging middleware
- centralized 404 + error handling
- pagination on `GET /tasks`

## Run

```bash
cd week06
npm install
npm start
```

Server runs on `http://localhost:3000` by default.

## Endpoints

### Users

- `GET /users`
- `GET /users/:userId`
- `POST /users`
- `PATCH /users/:userId`
- `DELETE /users/:userId`

### Tasks

- `GET /tasks`
- `GET /tasks/:taskId`
- `POST /tasks`
- `PATCH /tasks/:taskId`
- `DELETE /tasks/:taskId`

## Pagination

`GET /tasks` supports:

- `?page=1`
- `?limit=10`
- optional filters: `status`, `assigneeId`, `listId`

Response shape:

```json
{
  "data": [],
  "meta": {
    "page": 1,
    "limit": 10,
    "total": 0
  }
}
```

## Error format

All errors return:

```json
{
  "error": {
    "code": "SOME_CODE",
    "message": "Human readable message"
  }
}
```

Status usage:

- `400` invalid input
- `404` not found
- `409` conflicts

## Middleware

- `middleware/logger.js` - logs `[timestamp] METHOD /path`
- `middleware/notFound.js` - unmatched route handler
- `middleware/errorHandler.js` - centralized JSON error responses

## Screenshots for submission

Put Postman screenshots in `week06/screenshots/` and use the checklist in `week06/screenshots/README.md`.