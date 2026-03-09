const { users, getNextUserId } = require('../data/store');
const { sendError } = require('../middleware/errorResponse');

const listUsers = (req, res) => {
  return res.json({ data: users });
};

const getUserById = (req, res) => {
  const userId = Number.parseInt(req.params.id, 10);

  if (Number.isNaN(userId)) {
    return sendError(res, 400, 'INVALID_INPUT', 'User id must be a number');
  }

  const user = users.find((item) => item.id === userId);
  if (!user) {
    return sendError(res, 404, 'NOT_FOUND', 'User not found');
  }

  return res.json({ data: user });
};

const createUser = (req, res) => {
  const { name, email } = req.body;

  if (typeof name !== 'string' || name.trim() === '') {
    return sendError(res, 400, 'INVALID_INPUT', 'Field "name" is required and must be a string');
  }

  if (typeof email !== 'string' || email.trim() === '') {
    return sendError(res, 400, 'INVALID_INPUT', 'Field "email" is required and must be a string');
  }

  const duplicateEmail = users.find((item) => item.email.toLowerCase() === email.toLowerCase());
  if (duplicateEmail) {
    return sendError(res, 409, 'CONFLICT', 'A user with that email already exists');
  }

  const newUser = {
    id: getNextUserId(),
    name: name.trim(),
    email: email.trim()
  };

  users.push(newUser);
  return res.status(201).json({ data: newUser });
};

const updateUser = (req, res) => {
  const userId = Number.parseInt(req.params.id, 10);

  if (Number.isNaN(userId)) {
    return sendError(res, 400, 'INVALID_INPUT', 'User id must be a number');
  }

  const user = users.find((item) => item.id === userId);
  if (!user) {
    return sendError(res, 404, 'NOT_FOUND', 'User not found');
  }

  const { name, email } = req.body;
  if (name !== undefined) {
    if (typeof name !== 'string' || name.trim() === '') {
      return sendError(res, 400, 'INVALID_INPUT', 'Field "name" must be a non-empty string');
    }
    user.name = name.trim();
  }

  if (email !== undefined) {
    if (typeof email !== 'string' || email.trim() === '') {
      return sendError(res, 400, 'INVALID_INPUT', 'Field "email" must be a non-empty string');
    }

    const duplicateEmail = users.find(
      (item) => item.id !== userId && item.email.toLowerCase() === email.toLowerCase()
    );
    if (duplicateEmail) {
      return sendError(res, 409, 'CONFLICT', 'A user with that email already exists');
    }

    user.email = email.trim();
  }

  return res.json({ data: user });
};

const deleteUser = (req, res) => {
  const userId = Number.parseInt(req.params.id, 10);

  if (Number.isNaN(userId)) {
    return sendError(res, 400, 'INVALID_INPUT', 'User id must be a number');
  }

  const userIndex = users.findIndex((item) => item.id === userId);
  if (userIndex === -1) {
    return sendError(res, 404, 'NOT_FOUND', 'User not found');
  }

  users.splice(userIndex, 1);
  return res.status(204).send();
};

module.exports = {
  listUsers,
  getUserById,
  createUser,
  updateUser,
  deleteUser
};
