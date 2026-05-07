# ORM Reflection

## What problems does raw SQL create in large apps?

Working with raw SQL queries directly in your code gets messy really quickly. When your app grows and you have lots of queries scattered all over different files, it becomes harder to manage. If you need to change a table name or column name, you have to find and update every query manually - that's easy to miss something. You also have to deal with SQL injection vulnerabilities if you're not careful about escaping values. Plus, raw SQL ties your code to a specific database syntax, so switching from MySQL to PostgreSQL means rewriting a lot of code.

## What is an ORM in your own words?

An ORM is basically a layer that sits between your code and your database. Instead of writing SQL queries, you use methods and objects that feel more like regular JavaScript. For example, instead of writing `SELECT * FROM users WHERE id = 1`, you might do `User.findById(1)` or something similar. The ORM translates your code into the right SQL under the hood. It's like having a translator that speaks both JavaScript and SQL.

## What does an ORM replace or simplify?

An ORM replaces the need to write SQL queries yourself. It handles creating, reading, updating, and deleting data through simple methods. It also simplifies things like joining tables, filtering results, and dealing with relationships between tables. You don't have to worry about parameterized queries because the ORM handles that security stuff for you automatically. It also makes your code more consistent and easier to read since you're using the same patterns everywhere instead of mixing SQL with JavaScript.

## When would you NOT use an ORM?

There are definitely times when raw SQL is better. If you have really complex queries that do a lot of joins or aggregations, writing it out in SQL might be faster and clearer than trying to express it through an ORM. Performance-sensitive areas where you need super optimized queries might benefit from hand-written SQL. Also, for simple projects or one-off scripts, an ORM might be overkill - the setup and learning curve aren't worth it. And if you're doing something very database-specific or non-standard, an ORM might get in your way.