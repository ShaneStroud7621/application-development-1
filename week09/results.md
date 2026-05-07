# Task Management Database Results

## Database Overview

This is a Task Management System database that tracks users, projects, and tasks. It demonstrates relational database concepts with proper table relationships, foreign keys, and sample queries including JOIN operations.

## Tables Created

- **users**: Stores user information (id, name, email)
- **projects**: Stores project details (id, name, description, user_id)
- **tasks**: Stores task information (id, title, status, project_id)

## Relationships

- **One-to-Many**: One user can create many projects (user_id foreign key in projects table)
- **One-to-Many**: One project can contain many tasks (project_id foreign key in tasks table)

This creates a hierarchical structure: Users → Projects → Tasks

## Primary Key Explanation

A primary key is a unique identifier for each row in a database table. It ensures:
- No duplicate records
- Fast data retrieval
- Proper table relationships
- Data integrity

In this database, all primary keys are auto-incrementing integers.

## Foreign Key Explanation

A foreign key is a column that references the primary key of another table. It:
- Links related data between tables
- Ensures referential integrity
- Prevents orphaned records
- Maintains data consistency

For example, a task's project_id must reference an existing project.id, preventing invalid task assignments.