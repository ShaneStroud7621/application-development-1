# Error Handling

**Standard error format**
```json
{
  "error": {
    "code": "string",
    "message": "string",
    "details": "string"
  }
}
```

**Error cases**
- 400 Bad Request (invalid input)
  - Example: missing required field "title"
- 404 Not Found (missing resource)
  - Example: task id does not exist
- 409 Conflict (state conflict)
  - Example: list name already exists for the same owner
