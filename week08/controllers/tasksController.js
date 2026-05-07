const { tasks, users, getNextTaskId } = require('../data/store');
const { sendError } = require('../middleware/errorResponse');
const { parseId } = require('../utils/helpers');
const { TASK_STATUSES } = require('../utils/constants');

const validateTaskCreation = (title, status, assigneeId) => {
  if (typeof title !== 'string' || title.trim() === '') {
    return 'Field "title" is required and must be a string';
  }

  if (!TASK_STATUSES.includes(status)) {
    return `Field "status" must be one of: ${TASK_STATUSES.join(', ')}`;
  }

  if (assigneeId !== null) {
    if (!Number.isInteger(assigneeId)) {
      return 'Field "assigneeId" must be an integer or null';
    }
    const existingUser = users.find((user) => user.id === assigneeId);
    if (!existingUser) {
      return 'Assignee user not found';
    }
  }

  if (status === 'done' && assigneeId === null) {
    return 'A task cannot be set to done without an assignee';
  }

  return null;
};

const applyTaskUpdates = (task, updates) => {
  const { title, status, assigneeId } = updates;

  if (title !== undefined) {
    if (typeof title !== 'string' || title.trim() === '') {
      return { error: 'Field "title" must be a non-empty string' };
    }
    task.title = title.trim();
  }

  if (assigneeId !== undefined) {
    if (assigneeId !== null && !Number.isInteger(assigneeId)) {
      return { error: 'Field "assigneeId" must be an integer or null' };
    }
    if (assigneeId !== null) {
      const existingUser = users.find((user) => user.id === assigneeId);
      if (!existingUser) {
        return { error: 'Assignee user not found' };
      }
    }
    task.assigneeId = assigneeId;
  }

  if (status !== undefined) {
    if (!TASK_STATUSES.includes(status)) {
      return { error: `Field "status" must be one of: ${TASK_STATUSES.join(', ')}` };
    }
    task.status = status;
  }

  if (task.status === 'done' && task.assigneeId === null) {
    return { error: 'A task cannot be set to done without an assignee' };
  }

  return {};
};

const listTasks = (req, res) => {
  const page = Number.parseInt(req.query.page ?? '1', 10);
  const limit = Number.parseInt(req.query.limit ?? '10', 10);

  if (Number.isNaN(page) || page < 1 || Number.isNaN(limit) || limit < 1) {
    return sendError(res, 400, 'INVALID_INPUT', 'Query params "page" and "limit" must be positive integers');
  }

  const total = tasks.length;
  const startIndex = (page - 1) * limit;
  const paginatedTasks = tasks.slice(startIndex, startIndex + limit);

  return res.json({
    data: paginatedTasks,
    meta: {
      page,
      limit,
      total
    }
  });
};

const getTaskById = (req, res) => {
  const parsed = parseId(req.params.id, 'Task');
  if (parsed.error) {
    return sendError(res, 400, 'INVALID_INPUT', parsed.error);
  }

  const task = tasks.find((item) => item.id === parsed.id);
  if (!task) {
    return sendError(res, 404, 'NOT_FOUND', 'Task not found');
  }

  return res.json({ data: task });
};

const createTask = (req, res) => {
  const { title, status = 'open', assigneeId = null } = req.body;

  const validationError = validateTaskCreation(title, status, assigneeId);
  if (validationError) {
    return sendError(res, 400, 'INVALID_INPUT', validationError);
  }

  const newTask = {
    id: getNextTaskId(),
    title: title.trim(),
    status,
    assigneeId
  };

  tasks.push(newTask);
  return res.status(201).json({ data: newTask });
};

const updateTask = (req, res) => {
  const parsed = parseId(req.params.id, 'Task');
  if (parsed.error) {
    return sendError(res, 400, 'INVALID_INPUT', parsed.error);
  }

  const task = tasks.find((item) => item.id === parsed.id);
  if (!task) {
    return sendError(res, 404, 'NOT_FOUND', 'Task not found');
  }

  const { title, status, assigneeId } = req.body;

  const updateResult = applyTaskUpdates(task, { title, status, assigneeId });
  if (updateResult.error) {
    return sendError(res, 400, 'INVALID_INPUT', updateResult.error);
  }

  return res.json({ data: task });
};

const deleteTask = (req, res) => {
  const parsed = parseId(req.params.id, 'Task');
  if (parsed.error) {
    return sendError(res, 400, 'INVALID_INPUT', parsed.error);
  }

  const taskIndex = tasks.findIndex((item) => item.id === parsed.id);
  if (taskIndex === -1) {
    return sendError(res, 404, 'NOT_FOUND', 'Task not found');
  }

  tasks.splice(taskIndex, 1);
  return res.status(204).send();
};

module.exports = {
  listTasks,
  getTaskById,
  createTask,
  updateTask,
  deleteTask
};