# API Documentation

## Tasks Endpoints

### Endpoint: /tasks
### Method: GET
### Description:
Retrieve all tasks with optional pagination.

### Query Parameters:
- `page` (optional): Page number (default: 1)
- `limit` (optional): Number of items per page (default: 10)

### Request Body:
None

### Success Response:
200 OK
```json
{
  "data": [
    {
      "id": 1,
      "title": "Draft sprint plan",
      "status": "open",
      "assigneeId": 1
    },
    {
      "id": 2,
      "title": "Update onboarding docs",
      "status": "in_progress",
      "assigneeId": 2
    }
  ],
  "meta": {
    "page": 1,
    "limit": 10,
    "total": 2
  }
}
```

### Error Responses:
400 Bad Request
```json
{
  "error": {
    "code": "INVALID_INPUT",
    "message": "Query params \"page\" and \"limit\" must be positive integers"
  }
}
```

---

### Endpoint: /tasks/:id
### Method: GET
### Description:
Retrieve a specific task by ID.

### Request Body:
None

### Success Response:
200 OK
```json
{
  "data": {
    "id": 1,
    "title": "Draft sprint plan",
    "status": "open",
    "assigneeId": 1
  }
}
```

### Error Responses:
400 Bad Request
```json
{
  "error": {
    "code": "INVALID_INPUT",
    "message": "Task id must be a number"
  }
}
```
404 Not Found
```json
{
  "error": {
    "code": "NOT_FOUND",
    "message": "Task not found"
  }
}
```

---

### Endpoint: /tasks
### Method: POST
### Description:
Create a new task.

### Headers:
- `X-API-Key`: 12345

### Request Body:
```json
{
  "title": "string (required)",
  "status": "open | in_progress | done (optional, default: open)",
  "assigneeId": "integer or null (optional)"
}
```

### Success Response:
201 Created
```json
{
  "data": {
    "id": 3,
    "title": "New task",
    "status": "open",
    "assigneeId": null
  }
}
```

### Error Responses:
400 Bad Request
```json
{
  "error": {
    "code": "INVALID_INPUT",
    "message": "Field \"title\" is required and must be a string"
  }
}
```
404 Not Found
```json
{
  "error": {
    "code": "NOT_FOUND",
    "message": "Assignee user not found"
  }
}
```
409 Conflict
```json
{
  "error": {
    "code": "INVALID_STATE",
    "message": "A task cannot be set to done without an assignee"
  }
}
```
401 Unauthorized
```json
{
  "error": {
    "code": "UNAUTHORIZED",
    "message": "Missing or invalid API key"
  }
}
```

---

### Endpoint: /tasks/:id
### Method: PATCH
### Description:
Update an existing task.

### Headers:
- `X-API-Key`: 12345

### Request Body:
```json
{
  "title": "string (optional)",
  "status": "open | in_progress | done (optional)",
  "assigneeId": "integer or null (optional)"
}
```

### Success Response:
200 OK
```json
{
  "data": {
    "id": 1,
    "title": "Updated task",
    "status": "done",
    "assigneeId": 1
  }
}
```

### Error Responses:
400 Bad Request
```json
{
  "error": {
    "code": "INVALID_INPUT",
    "message": "Task id must be a number"
  }
}
```
404 Not Found
```json
{
  "error": {
    "code": "NOT_FOUND",
    "message": "Task not found"
  }
}
```
409 Conflict
```json
{
  "error": {
    "code": "INVALID_STATE",
    "message": "A task cannot be set to done without an assignee"
  }
}
```
401 Unauthorized
```json
{
  "error": {
    "code": "UNAUTHORIZED",
    "message": "Missing or invalid API key"
  }
}
```

---

### Endpoint: /tasks/:id
### Method: DELETE
### Description:
Delete a task by ID.

### Headers:
- `X-API-Key`: 12345

### Request Body:
None

### Success Response:
204 No Content

### Error Responses:
400 Bad Request
```json
{
  "error": {
    "code": "INVALID_INPUT",
    "message": "Task id must be a number"
  }
}
```
404 Not Found
```json
{
  "error": {
    "code": "NOT_FOUND",
    "message": "Task not found"
  }
}
```
401 Unauthorized
```json
{
  "error": {
    "code": "UNAUTHORIZED",
    "message": "Missing or invalid API key"
  }
}
```

## Users Endpoints

### Endpoint: /users
### Method: GET
### Description:
Retrieve all users.

### Request Body:
None

### Success Response:
200 OK
```json
{
  "data": [
    {
      "id": 1,
      "name": "Alex Rivera",
      "email": "alex@example.com"
    },
    {
      "id": 2,
      "name": "Jordan Lee",
      "email": "jordan@example.com"
    }
  ]
}
```

### Error Responses:
None

---

### Endpoint: /users/:id
### Method: GET
### Description:
Retrieve a specific user by ID.

### Request Body:
None

### Success Response:
200 OK
```json
{
  "data": {
    "id": 1,
    "name": "Alex Rivera",
    "email": "alex@example.com"
  }
}
```

### Error Responses:
400 Bad Request
```json
{
  "error": {
    "code": "INVALID_INPUT",
    "message": "User id must be a number"
  }
}
```
404 Not Found
```json
{
  "error": {
    "code": "NOT_FOUND",
    "message": "User not found"
  }
}
```

---

### Endpoint: /users
### Method: POST
### Description:
Create a new user.

### Request Body:
```json
{
  "name": "string (required)",
  "email": "string (required)"
}
```

### Success Response:
201 Created
```json
{
  "data": {
    "id": 3,
    "name": "New User",
    "email": "new@example.com"
  }
}
```

### Error Responses:
400 Bad Request
```json
{
  "error": {
    "code": "INVALID_INPUT",
    "message": "Field \"name\" is required and must be a string"
  }
}
```
409 Conflict
```json
{
  "error": {
    "code": "CONFLICT",
    "message": "A user with that email already exists"
  }
}
```

---

### Endpoint: /users/:id
### Method: PATCH
### Description:
Update an existing user.

### Request Body:
```json
{
  "name": "string (optional)",
  "email": "string (optional)"
}
```

### Success Response:
200 OK
```json
{
  "data": {
    "id": 1,
    "name": "Updated Name",
    "email": "updated@example.com"
  }
}
```

### Error Responses:
400 Bad Request
```json
{
  "error": {
    "code": "INVALID_INPUT",
    "message": "User id must be a number"
  }
}
```
404 Not Found
```json
{
  "error": {
    "code": "NOT_FOUND",
    "message": "User not found"
  }
}
```
409 Conflict
```json
{
  "error": {
    "code": "CONFLICT",
    "message": "A user with that email already exists"
  }
}
```

---

### Endpoint: /users/:id
### Method: DELETE
### Description:
Delete a user by ID.

### Request Body:
None

### Success Response:
204 No Content

### Error Responses:
400 Bad Request
```json
{
  "error": {
    "code": "INVALID_INPUT",
    "message": "User id must be a number"
  }
}
```
404 Not Found
```json
{
  "error": {
    "code": "NOT_FOUND",
    "message": "User not found"
  }
}
```