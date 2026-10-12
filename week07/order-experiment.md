# Middleware Order Experiment

## What Changed

I reproduced the wrong order in a temporary Express router by registering the task `POST` handler before authorization, equivalent to moving authorization below the routes in `routes/tasksRoutes.js`. I sent `POST /tasks` with a valid title and no `x-api-key` header.

## What Broke

- Express reaches the matching `POST /` route before it reaches the later authorization middleware.
- The controller creates the task and sends `201`; the later authorization middleware is not reached.
- The request succeeds without a key. No error is produced; the missing authorization check is the failure.

## Why It Broke

Express middleware and route handlers run in registration order. A handler that sends a response without calling `next()` stops traversal through the router, so authorization placed after that handler cannot protect it.

## Fix

The working order in `routes/tasksRoutes.js` is authorization, validation, and then the route controller. With authorization first, a missing or incorrect key returns `401` before validation or controller code can run.
