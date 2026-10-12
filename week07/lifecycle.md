# Task Request Lifecycle

The global order is JSON body parsing, timing middleware, route matching, and
then the middleware and handler registered on the matched route. The timing
middleware listens for the response `finish` event, so it logs after a response
has been sent, including responses sent by middleware that short-circuits.

## 1. Valid `POST /tasks` with an API key

1. Express receives the request, and `express.json()` parses the JSON body.
2. The timing middleware records the start time, registers a `finish` listener, and calls `next()`.
3. Express matches the `/tasks` router.
4. The router's authorization middleware checks `x-api-key`; it is `12345`, so the middleware calls `next()`.
5. Task validation checks that `title` is a non-empty string; it is valid, so the middleware calls `next()`.
6. The `POST /` route invokes `createTask`, which creates the task and sends a `201` JSON response.
7. The response finishes, and timing logs a line such as `[POST /tasks] completed in 4ms`.

The controller executes because both authorization and validation pass their
checks and call `next()`.

## 2. `POST /tasks` without the required title

1. Express receives the request, and `express.json()` parses its body.
2. The timing middleware records the start time, registers a `finish` listener, and calls `next()`.
3. Express matches the `/tasks` router.
4. Authorization checks `x-api-key`. With the correct key, it calls `next()`.
5. Task validation finds that `title` is missing or invalid, sends a `400` JSON error response, and does not call `next()`.
6. The response finishes, and the timing middleware logs the elapsed time.

The controller does not execute because validation ends the request by sending
the response instead of calling `next()`.

## 3. `POST /tasks` with a missing API key

1. Express receives the request, and `express.json()` parses its body.
2. The timing middleware records the start time, registers a `finish` listener, and calls `next()`.
3. Express matches the `/tasks` router.
4. Authorization finds no `x-api-key`, sends a `401` JSON error response, and does not call `next()`.
5. The response finishes, and the timing middleware logs the elapsed time.

Neither validation nor the controller executes because authorization short-circuits the request first.
