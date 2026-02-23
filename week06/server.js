const express = require('express');
const tasksRoutes = require('./routes/tasks');
const usersRoutes = require('./routes/users');
const logger = require('./middleware/logger');
const notFound = require('./middleware/notFound');

const app = express();
const PORT = 3000;

// JSON parsing
app.use(express.json());

// Custom logger middleware
app.use(logger);

// Routes
app.use('/tasks', tasksRoutes);
app.use('/users', usersRoutes);

// 404 handler
app.use(notFound);

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
