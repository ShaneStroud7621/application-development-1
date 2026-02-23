# Week 06 API

Simple Express API with two resources: `tasks` and `users`.

## Setup

```bash
cd week06
npm install
npm start
```

Server runs at `http://localhost:3000`.

## Endpoints (10 total)

### Tasks
- `GET /tasks?page=1&limit=10`
- `GET /tasks/:id`
- `POST /tasks`
- `PATCH /tasks/:id`
- `DELETE /tasks/:id`

### Users
- `GET /users`
- `GET /users/:id`
- `POST /users`
- `PATCH /users/:id`
- `DELETE /users/:id`

## Example Bodies

### Create task
```json
{
  "title": "Finish assignment"
}
```

### Create user
```json
{
  "name": "Shane",
  "email": "shane@example.com"
}
```

## Postman Quick Test Order
1. `POST /tasks`
2. `GET /tasks`
3. `GET /tasks/1`
4. `PATCH /tasks/1`
5. `DELETE /tasks/1`
6. `POST /users`
7. `GET /users`
8. `GET /users/1`
9. `PATCH /users/1`
10. `DELETE /users/1`

Take screenshots of successful requests and save them in the `screenshots/` folder.
