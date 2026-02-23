const express = require("express");
const app = express();

const usersRouter = require("./routes/users");
const tasksRouter = require("./routes/tasks");
const logger = require("./middleware/logger");
const errorHandler = require("./middleware/errorHandler");
const notFound = require("./middleware/notFound");

app.use(express.json());
app.use(logger);

app.get("/", (req, res) => {
  res.status(200).json({ message: "Task Manager API — Week 06" });
});

app.use("/users", usersRouter);
app.use("/tasks", tasksRouter);

app.use(notFound);
app.use(errorHandler);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});

module.exports = app;
