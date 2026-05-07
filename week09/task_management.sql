-- Task Management Database
-- This SQL file creates a relational database for a task management system

-- Create database
CREATE DATABASE task_management_db;
USE task_management_db;

-- Create tables

-- Users table
CREATE TABLE users (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    email VARCHAR(255) NOT NULL UNIQUE
);

-- Projects table
CREATE TABLE projects (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    description TEXT,
    user_id INT,
    FOREIGN KEY (user_id) REFERENCES users(id)
);

-- Tasks table
CREATE TABLE tasks (
    id INT AUTO_INCREMENT PRIMARY KEY,
    title VARCHAR(255) NOT NULL,
    status ENUM('pending', 'in_progress', 'completed') NOT NULL,
    project_id INT,
    FOREIGN KEY (project_id) REFERENCES projects(id)
);

-- Insert sample data

-- Insert users
INSERT INTO users (name, email) VALUES
('Alice Johnson', 'alice@example.com'),
('Bob Smith', 'bob@example.com'),
('Charlie Brown', 'charlie@example.com');

-- Insert projects
INSERT INTO projects (name, description, user_id) VALUES
('Website Redesign', 'Redesign the company website with modern UI/UX', 1),
('Mobile App Development', 'Develop a new mobile application for iOS and Android', 2),
('Database Migration', 'Migrate legacy database to new cloud infrastructure', 3);

-- Insert tasks
INSERT INTO tasks (title, status, project_id) VALUES
('Design homepage mockup', 'completed', 1),
('Implement user authentication', 'in_progress', 1),
('Create API endpoints', 'pending', 2),
('Test mobile app functionality', 'pending', 2),
('Backup current database', 'completed', 3),
('Migrate data to new system', 'in_progress', 3),
('Update system documentation', 'pending', 3);

-- Required Queries

-- Query 1 — All users
SELECT * FROM users;

-- Query 2 — All projects
SELECT * FROM projects;

-- Query 3 — All tasks
SELECT * FROM tasks;

-- Query 4 — JOIN tasks + projects
SELECT
    tasks.title,
    tasks.status,
    projects.name AS project_name
FROM tasks
JOIN projects ON tasks.project_id = projects.id;

-- Query 5 — JOIN projects + users
SELECT
    projects.name AS project_name,
    users.name AS user_name
FROM projects
JOIN users ON projects.user_id = users.id;

-- Query 6 — Completed tasks only
SELECT *
FROM tasks
WHERE status = 'completed';

-- Query 7 — Sort tasks alphabetically
SELECT *
FROM tasks
ORDER BY title ASC;