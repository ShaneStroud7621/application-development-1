const pool = require('../db');
const { sendError } = require('../middleware/errorResponse');

const ALLOWED_STATUSES = ['pending', 'in_progress', 'completed'];

const parseId = (value, resourceName) => {
  const id = Number.parseInt(value, 10);
  if (Number.isNaN(id)) {
    return { error: `${resourceName} id must be a number` };
  }
  return { id };
};

const listTasks = async (req, res) => {
  try {
    const [rows] = await pool.query('SELECT * FROM tasks');
    return res.json({ data: rows });
  } catch (error) {
    console.error('Error fetching tasks:', error);
    return sendError(res, 500, 'DATABASE_ERROR', 'Failed to fetch tasks');
  }
};

const getTaskById = async (req, res) => {
  try {
    const parsed = parseId(req.params.id, 'Task');
    if (parsed.error) {
      return sendError(res, 400, 'INVALID_INPUT', parsed.error);
    }

    const [rows] = await pool.query('SELECT * FROM tasks WHERE id = ?', [parsed.id]);
    if (rows.length === 0) {
      return sendError(res, 404, 'NOT_FOUND', 'Task not found');
    }

    return res.json({ data: rows[0] });
  } catch (error) {
    console.error('Error fetching task:', error);
    return sendError(res, 500, 'DATABASE_ERROR', 'Failed to fetch task');
  }
};

const createTask = async (req, res) => {
  try {
    const { title, status = 'pending', project_id } = req.body;

    if (typeof title !== 'string' || title.trim() === '') {
      return sendError(res, 400, 'INVALID_INPUT', 'Field "title" is required and must be a string');
    }

    if (!ALLOWED_STATUSES.includes(status)) {
      return sendError(
        res,
        400,
        'INVALID_INPUT',
        `Field "status" must be one of: ${ALLOWED_STATUSES.join(', ')}`
      );
    }

    if (project_id && !Number.isInteger(project_id)) {
      return sendError(res, 400, 'INVALID_INPUT', 'Field "project_id" must be an integer');
    }

    if (project_id) {
      const [projects] = await pool.query('SELECT * FROM projects WHERE id = ?', [project_id]);
      if (projects.length === 0) {
        return sendError(res, 404, 'NOT_FOUND', 'Project not found');
      }
    }

    const [result] = await pool.query(
      'INSERT INTO tasks (title, status, project_id) VALUES (?, ?, ?)',
      [title.trim(), status, project_id || null]
    );

    const [newTask] = await pool.query('SELECT * FROM tasks WHERE id = ?', [result.insertId]);

    return res.status(201).json({ data: newTask[0] });
  } catch (error) {
    console.error('Error creating task:', error);
    return sendError(res, 500, 'DATABASE_ERROR', 'Failed to create task');
  }
};

const updateTask = async (req, res) => {
  try {
    const parsed = parseId(req.params.id, 'Task');
    if (parsed.error) {
      return sendError(res, 400, 'INVALID_INPUT', parsed.error);
    }

    const { title, status, project_id } = req.body;

    const [existingTask] = await pool.query('SELECT * FROM tasks WHERE id = ?', [parsed.id]);
    if (existingTask.length === 0) {
      return sendError(res, 404, 'NOT_FOUND', 'Task not found');
    }

    const currentTitle = title !== undefined ? title.trim() : existingTask[0].title;
    const currentStatus = status !== undefined ? status : existingTask[0].status;
    const currentProjectId = project_id !== undefined ? project_id : existingTask[0].project_id;

    if (title !== undefined) {
      if (typeof title !== 'string' || title.trim() === '') {
        return sendError(res, 400, 'INVALID_INPUT', 'Field "title" must be a non-empty string');
      }
    }

    if (status !== undefined) {
      if (!ALLOWED_STATUSES.includes(status)) {
        return sendError(
          res,
          400,
          'INVALID_INPUT',
          `Field "status" must be one of: ${ALLOWED_STATUSES.join(', ')}`
        );
      }
    }

    if (project_id !== undefined && project_id !== null && !Number.isInteger(project_id)) {
      return sendError(res, 400, 'INVALID_INPUT', 'Field "project_id" must be an integer or null');
    }

    if (project_id !== undefined && project_id !== null) {
      const [projects] = await pool.query('SELECT * FROM projects WHERE id = ?', [project_id]);
      if (projects.length === 0) {
        return sendError(res, 404, 'NOT_FOUND', 'Project not found');
      }
    }

    await pool.query(
      'UPDATE tasks SET title = ?, status = ?, project_id = ? WHERE id = ?',
      [currentTitle, currentStatus, currentProjectId, parsed.id]
    );

    const [updatedTask] = await pool.query('SELECT * FROM tasks WHERE id = ?', [parsed.id]);

    return res.json({ data: updatedTask[0] });
  } catch (error) {
    console.error('Error updating task:', error);
    return sendError(res, 500, 'DATABASE_ERROR', 'Failed to update task');
  }
};

const deleteTask = async (req, res) => {
  try {
    const parsed = parseId(req.params.id, 'Task');
    if (parsed.error) {
      return sendError(res, 400, 'INVALID_INPUT', parsed.error);
    }

    const [existingTask] = await pool.query('SELECT * FROM tasks WHERE id = ?', [parsed.id]);
    if (existingTask.length === 0) {
      return sendError(res, 404, 'NOT_FOUND', 'Task not found');
    }

    await pool.query('DELETE FROM tasks WHERE id = ?', [parsed.id]);

    return res.status(204).send();
  } catch (error) {
    console.error('Error deleting task:', error);
    return sendError(res, 500, 'DATABASE_ERROR', 'Failed to delete task');
  }
};

module.exports = {
  listTasks,
  getTaskById,
  createTask,
  updateTask,
  deleteTask
};
