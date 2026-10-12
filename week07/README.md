# Week 07: Middleware and Request Lifecycle

This folder contains the Week 06 API carried forward with timing, task-title validation, and API-key authorization middleware.

## Run the API

From this directory, run `npm install` if needed, then `npm start`. The API listens on port `3000` by default.

## Middleware Behavior

- Timing runs for every request and logs when its response finishes.
- Task creation requires a non-empty `title` and returns `400` when invalid.
- `POST`, `PATCH`, and `DELETE` on `/tasks` require `x-api-key: 12345`; missing or incorrect keys return `401`.
- `GET` task routes do not require an API key.

See [lifecycle.md](lifecycle.md) for request execution steps and [order-experiment.md](order-experiment.md) for the middleware-order experiment.

## Screenshots

The [screenshots README](screenshots/README.md) describes the current images and the Postman scenarios still needed for complete route evidence.