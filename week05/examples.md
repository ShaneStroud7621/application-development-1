# Examples

## POST /tasks
**Request**
```http
POST /tasks
Content-Type: application/json

{
  "title": "Write API outline",
  "status": "open",
  "dueDate": "2026-02-20",
  "assigneeId": "usr_123",
  "listId": "lst_456"
}
```
**Response (201 Created)**
```json
{
  "id": "tsk_789",
  "title": "Write API outline",
  "status": "open",
  "dueDate": "2026-02-20",
  "assigneeId": "usr_123",
  "listId": "lst_456",
  "createdAt": "2026-02-15T18:30:00Z",
  "updatedAt": "2026-02-15T18:30:00Z"
}
```

## GET /tasks/{taskId}
**Request**
```http
GET /tasks/tsk_789
```
**Response (200 OK)**
```json
{
  "id": "tsk_789",
  "title": "Write API outline",
  "status": "open",
  "dueDate": "2026-02-20",
  "assigneeId": "usr_123",
  "listId": "lst_456",
  "createdAt": "2026-02-15T18:30:00Z",
  "updatedAt": "2026-02-15T18:30:00Z"
}
```

## PATCH /tasks/{taskId}
**Request**
```http
PATCH /tasks/tsk_789
Content-Type: application/json

{
  "status": "done"
}
```
**Response (200 OK)**
```json
{
  "id": "tsk_789",
  "title": "Write API outline",
  "status": "done",
  "dueDate": "2026-02-20",
  "assigneeId": "usr_123",
  "listId": "lst_456",
  "createdAt": "2026-02-15T18:30:00Z",
  "updatedAt": "2026-02-15T19:05:00Z"
}
```
