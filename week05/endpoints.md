# Endpoints

## users
- GET /users
  - Purpose: List all users
  - Returns: 200 OK
- GET /users/{userId}
  - Purpose: Get a single user by id
  - Returns: 200 OK
- POST /users
  - Purpose: Create a new user
  - Returns: 201 Created
- PATCH /users/{userId}
  - Purpose: Update user profile fields
  - Returns: 200 OK
- DELETE /users/{userId}
  - Purpose: Delete a user
  - Returns: 204 No Content

## tasks
- GET /tasks
  - Purpose: List all tasks
  - Returns: 200 OK
- GET /tasks/{taskId}
  - Purpose: Get a single task by id
  - Returns: 200 OK
- POST /tasks
  - Purpose: Create a new task
  - Returns: 201 Created
- PATCH /tasks/{taskId}
  - Purpose: Update task fields (title, status, dueDate, assigneeId)
  - Returns: 200 OK
- DELETE /tasks/{taskId}
  - Purpose: Delete a task
  - Returns: 204 No Content

## lists
- GET /lists
  - Purpose: List all lists
  - Returns: 200 OK
- GET /lists/{listId}
  - Purpose: Get a single list by id
  - Returns: 200 OK
- POST /lists
  - Purpose: Create a new list
  - Returns: 201 Created
- PUT /lists/{listId}
  - Purpose: Replace list name and description
  - Returns: 200 OK
- DELETE /lists/{listId}
  - Purpose: Delete a list
  - Returns: 204 No Content

## relationships
- GET /users/{userId}/tasks
  - Purpose: List tasks assigned to a user
  - Returns: 200 OK
- GET /lists/{listId}/tasks
  - Purpose: List tasks in a list
  - Returns: 200 OK
