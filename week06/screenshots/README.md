# Week 06 Postman Evidence

Place your Postman screenshots in this folder. Capture the full Postman window so the request setup and response are both visible.

## Suggested screenshot files (10 total)

1. `01-get-users.png` - `GET /users` (200)
2. `02-get-user-by-id.png` - `GET /users/:userId` (200)
3. `03-post-user.png` - `POST /users` (201)
4. `04-patch-user.png` - `PATCH /users/:userId` (200)
5. `05-delete-user.png` - `DELETE /users/:userId` (204)
6. `06-get-tasks-with-pagination.png` - `GET /tasks?page=1&limit=2` (200, shows `meta`)
7. `07-get-task-by-id.png` - `GET /tasks/:taskId` (200)
8. `08-post-task.png` - `POST /tasks` (201)
9. `09-patch-task.png` - `PATCH /tasks/:taskId` (200)
10. `10-delete-task.png` - `DELETE /tasks/:taskId` (204)

## Optional error evidence (recommended)

- `11-user-not-found-404.png` - `GET /users/bad_id`
- `12-user-conflict-409.png` - duplicate email on `POST /users`
- `13-task-invalid-status-409.png` - invalid status on `PATCH /tasks/:taskId`

If you submit optional error screenshots, mention them in your Week 06 reflection or assignment note.