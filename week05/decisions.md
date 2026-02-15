# Design Decisions

**Why these resources**
Tasks, users, and lists are the smallest useful building blocks for a todo system, and they map cleanly to stable, reusable endpoints.

**Why PATCH vs PUT**
PATCH is used for tasks and users because most updates are partial (status, title, assignee). PUT is used for lists to demonstrate full replacement semantics.

**Avoiding breaking clients**
The API uses explicit versioning in the URL (e.g., /v1) in implementation, keeps field names stable, and adds new fields as optional.

**One tradeoff**
Keeping tasks as a top-level resource makes cross-list queries easy, but requires clients to pass listId explicitly on create.
