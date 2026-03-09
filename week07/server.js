const express = require('express');
const usersRoutes = require('./routes/usersRoutes');
const tasksRoutes = require('./routes/tasksRoutes');
const logger = require('./middleware/logger');
const { sendError } = require('./middleware/errorResponse');

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());
app.use(logger);

app.get('/', (req, res) => {
  res.json({ data: { message: 'Week 06 REST API is running' } });
});

app.use('/users', usersRoutes);
app.use('/tasks', tasksRoutes);

app.use((req, res) => {
  return sendError(res, 404, 'NOT_FOUND', 'Route not found');
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
