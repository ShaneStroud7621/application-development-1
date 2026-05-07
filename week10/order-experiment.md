# Middleware Order Experiment

## Experiment

Place Auth middleware after controller route definitions in `tasksRoutes`.

## What Breaks

- The controller can send the response before Auth runs.
- Because the request is already completed, the Auth middleware is effectively bypassed.

## Result

- A client can `POST` data without a valid `x-api-key`.
- Security check fails as a gatekeeper because it is positioned behind the gate.

## Lesson

Middleware order controls execution flow. Authentication and validation must run before protected controllers.
