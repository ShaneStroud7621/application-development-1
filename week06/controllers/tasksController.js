let tasks = [];
let currentId = 1;

// GET all tasks (with pagination)
exports.getTasks = (req, res) => {
  let { page = 1, limit = 10 } = req.query;

  page = parseInt(page);
  limit = parseInt(limit);

  const start = (page - 1) * limit;
  const end = start + limit;

  const paginated = tasks.slice(start, end);

  res.json({
    data: paginated,
    meta: {
      page,
      limit,
      total: tasks.length
    }
  });
};

// GET single task
exports.getTaskById = (req, res) => {
  const id = parseInt(req.params.id);
  const task = tasks.find(t => t.id === id);

  if (!task) {
    return res.status(404).json({
      error: {
        code: "TASK_NOT_FOUND",
        message: "Task not found"
      }
    });
  }

  res.json(task);
};

// POST create task
exports.createTask = (req, res) => {
  const { title } = req.body;

  if (!title) {
    return res.status(400).json({
      error: {
        code: "INVALID_INPUT",
        message: "Title is required"
      }
    });
  }

  const newTask = {
    id: currentId++,
    title
  };

  tasks.push(newTask);
  res.status(201).json(newTask);
};

// PATCH update task
exports.updateTask = (req, res) => {
  const id = parseInt(req.params.id);
  const task = tasks.find(t => t.id === id);

  if (!task) {
    return res.status(404).json({
      error: {
        code: "TASK_NOT_FOUND",
        message: "Task not found"
      }
    });
  }

  if (req.body.title) {
    task.title = req.body.title;
  }

  res.json(task);
};

// DELETE task
exports.deleteTask = (req, res) => {
  const id = parseInt(req.params.id);
  const index = tasks.findIndex(t => t.id === id);

  if (index === -1) {
    return res.status(404).json({
      error: {
        code: "TASK_NOT_FOUND",
        message: "Task not found"
      }
    });
  }

  tasks.splice(index, 1);
  res.status(204).send();
};
