# Screenshot Checklist

Take these screenshots from MySQL Workbench after running the task_management.sql file:

## Required Screenshots

1. **tables.png**
   - Screenshot showing all 3 tables (users, projects, tasks) in the database schema view
   - Should show table names, columns, and relationships

2. **users-data.png**
   - Screenshot of the users table data
   - Should show all 3 users with their id, name, and email

3. **projects-data.png**
   - Screenshot of the projects table data
   - Should show all 3 projects with their details and user_id references

4. **tasks-data.png**
   - Screenshot of the tasks table data
   - Should show all 7+ tasks with their project_id references

5. **query4-join.png**
   - Screenshot of Query 4 results (JOIN tasks + projects)
   - Should show task title, status, and project name columns

6. **query5-join.png**
   - Screenshot of Query 5 results (JOIN projects + users)
   - Should show project name and user name columns

## Instructions

1. Open MySQL Workbench
2. Connect to your MySQL server
3. Run the `task_management.sql` file
4. Navigate to the task_management_db database
5. Take screenshots of each required view/query result
6. Save them with the exact filenames listed above
7. Place all screenshots in this `screenshots/` folder