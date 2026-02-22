let tasks = [
  { id: "tsk_1", title: "Design database schema", status: "open", dueDate: "2025-02-01", assigneeId: "usr_1", listId: "lst_1", createdAt: "2025-01-01T00:00:00Z" },
  { id: "tsk_2", title: "Build REST API", status: "open", dueDate: "2025-02-15", assigneeId: "usr_2", listId: "lst_1", createdAt: "2025-01-02T00:00:00Z" },
  { id: "tsk_3", title: "Write unit tests", status: "closed", dueDate: "2025-03-01", assigneeId: "usr_1", listId: "lst_2", createdAt: "2025-01-03T00:00:00Z" },
];
let nextId = 4;

function getAll(req, res) {
  const { page, limit, status, assigneeId, listId } = req.query;

  let results = [...tasks];

  if (status) results = results.filter((t) => t.status === status);
  if (assigneeId) results = results.filter((t) => t.assigneeId === assigneeId);
  if (listId) results = results.filter((t) => t.listId === listId);

  const pageNum = parseInt(page, 10) || 1;
  const limitNum = parseInt(limit, 10) || 20;
  const start = (pageNum - 1) * limitNum;
  const paginated = results.slice(start, start + limitNum);

  res.status(200).json({
    data: paginated,
    pagination: {
      page: pageNum,
      limit: limitNum,
      total: results.length,
    },
  });
}

function getOne(req, res, next) {
  const task = tasks.find((t) => t.id === req.params.taskId);
  if (!task) {
    const err = new Error("Task not found");
    err.status = 404;
    err.code = "NOT_FOUND";
    return next(err);
  }
  res.status(200).json({ data: task });
}

function create(req, res, next) {
  const { title, dueDate, assigneeId, listId } = req.body;
  if (!title) {
    const err = new Error("Missing required field: title");
    err.status = 400;
    err.code = "BAD_REQUEST";
    return next(err);
  }
  const task = {
    id: `tsk_${nextId++}`,
    title,
    status: "open",
    dueDate: dueDate || null,
    assigneeId: assigneeId || null,
    listId: listId || null,
    createdAt: new Date().toISOString(),
  };
  tasks.push(task);
  res.status(201).json({ data: task });
}

function update(req, res, next) {
  const index = tasks.findIndex((t) => t.id === req.params.taskId);
  if (index === -1) {
    const err = new Error("Task not found");
    err.status = 404;
    err.code = "NOT_FOUND";
    return next(err);
  }
  const { title, status, dueDate, assigneeId } = req.body;
  const allowed = ["open", "closed"];
  if (status && !allowed.includes(status)) {
    const err = new Error(`status must be one of: ${allowed.join(", ")}`);
    err.status = 400;
    err.code = "BAD_REQUEST";
    return next(err);
  }
  tasks[index] = {
    ...tasks[index],
    ...(title && { title }),
    ...(status && { status }),
    ...(dueDate !== undefined && { dueDate }),
    ...(assigneeId !== undefined && { assigneeId }),
  };
  res.status(200).json({ data: tasks[index] });
}

function remove(req, res, next) {
  const index = tasks.findIndex((t) => t.id === req.params.taskId);
  if (index === -1) {
    const err = new Error("Task not found");
    err.status = 404;
    err.code = "NOT_FOUND";
    return next(err);
  }
  tasks.splice(index, 1);
  res.status(204).send();
}

module.exports = { getAll, getOne, create, update, remove };
