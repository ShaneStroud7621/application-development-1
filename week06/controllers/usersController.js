let users = [
  { id: "usr_1", name: "Alice Smith", email: "alice@example.com", createdAt: "2025-01-01T00:00:00Z" },
  { id: "usr_2", name: "Bob Jones", email: "bob@example.com", createdAt: "2025-01-02T00:00:00Z" },
];
let nextId = 3;

function getAll(req, res) {
  res.status(200).json({ data: users });
}

function getOne(req, res, next) {
  const user = users.find((u) => u.id === req.params.userId);
  if (!user) {
    const err = new Error("User not found");
    err.status = 404;
    err.code = "NOT_FOUND";
    return next(err);
  }
  res.status(200).json({ data: user });
}

function create(req, res, next) {
  const { name, email } = req.body;
  if (!name || !email) {
    const err = new Error("Missing required fields: name, email");
    err.status = 400;
    err.code = "BAD_REQUEST";
    return next(err);
  }
  if (users.find((u) => u.email === email)) {
    const err = new Error("A user with that email already exists");
    err.status = 409;
    err.code = "CONFLICT";
    return next(err);
  }
  const user = { id: `usr_${nextId++}`, name, email, createdAt: new Date().toISOString() };
  users.push(user);
  res.status(201).json({ data: user });
}

function update(req, res, next) {
  const index = users.findIndex((u) => u.id === req.params.userId);
  if (index === -1) {
    const err = new Error("User not found");
    err.status = 404;
    err.code = "NOT_FOUND";
    return next(err);
  }
  const { name, email } = req.body;
  if (email && users.find((u) => u.email === email && u.id !== req.params.userId)) {
    const err = new Error("A user with that email already exists");
    err.status = 409;
    err.code = "CONFLICT";
    return next(err);
  }
  users[index] = { ...users[index], ...(name && { name }), ...(email && { email }) };
  res.status(200).json({ data: users[index] });
}

function remove(req, res, next) {
  const index = users.findIndex((u) => u.id === req.params.userId);
  if (index === -1) {
    const err = new Error("User not found");
    err.status = 404;
    err.code = "NOT_FOUND";
    return next(err);
  }
  users.splice(index, 1);
  res.status(204).send();
}

module.exports = { getAll, getOne, create, update, remove };
