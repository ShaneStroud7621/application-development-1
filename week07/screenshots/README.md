# Postman Screenshots

The folder currently contains two Postman images:

- `postman 1.png` shows a `POST /users` request setup, but does not show its response.
- `week 7 photos.png` shows a successful `POST /tasks` response with the API key and an open Postman AI panel.

For complete assignment evidence, add full-screen captures that show the
request method and URL, relevant headers or body, and the resulting response:

- `get-no-key.png`: `GET /tasks` with no API key, returning `200`.
- `post-success.png`: `POST /tasks` with `x-api-key: 12345` and a valid title, returning `201`.
- `post-bad-data.png`: `POST /tasks` with the key but no valid title, returning `400`.
- `post-no-key.png`: `POST /tasks` with a valid title but no key, returning `401`.

These four captures are not present yet; the existing images above are retained
as-is and are not substitutes for those scenarios.
