# Request Lifecycle (Valid POST /tasks)

1. Request hits the Express server.
2. Global timing middleware (`middleware/logger.js`) stores start time and calls `next()`.
3. Request enters `/tasks` router.
4. Auth middleware checks `x-api-key` for write methods (`POST`, `PATCH`, `DELETE`).
5. Validation middleware checks `req.body.title` for `POST` and `PATCH`.
6. Controller (`createTask`) runs and sends `res.status(201).json(...)`.
7. Response `finish` event fires.
8. Timing middleware logs: `[POST /tasks] completed in Xms`.

## Short-Circuit Cases

- Auth failure: middleware sends `401` and does not call `next()`.
- Validation failure: middleware sends `400` and does not call `next()`.
- In both cases, the controller does not execute.
