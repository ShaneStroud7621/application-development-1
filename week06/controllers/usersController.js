let users = [];
let currentId = 1;

exports.getUsers = (req, res) => {
  res.json(users);
};

exports.getUserById = (req, res) => {
  const id = parseInt(req.params.id);
  const user = users.find(u => u.id === id);

  if (!user) {
    return res.status(404).json({
      error: {
        code: "USER_NOT_FOUND",
        message: "User not found"
      }
    });
  }

  res.json(user);
};

exports.createUser = (req, res) => {
  const { name, email } = req.body;

  if (!name || !email) {
    return res.status(400).json({
      error: {
        code: "INVALID_INPUT",
        message: "Name and email required"
      }
    });
  }

  if (users.some(u => u.email === email)) {
    return res.status(409).json({
      error: {
        code: "EMAIL_EXISTS",
        message: "Email already exists"
      }
    });
  }

  const newUser = {
    id: currentId++,
    name,
    email
  };

  users.push(newUser);
  res.status(201).json(newUser);
};

exports.updateUser = (req, res) => {
  const id = parseInt(req.params.id);
  const user = users.find(u => u.id === id);

  if (!user) {
    return res.status(404).json({
      error: {
        code: "USER_NOT_FOUND",
        message: "User not found"
      }
    });
  }

  Object.assign(user, req.body);
  res.json(user);
};

exports.deleteUser = (req, res) => {
  const id = parseInt(req.params.id);
  const index = users.findIndex(u => u.id === id);

  if (index === -1) {
    return res.status(404).json({
      error: {
        code: "USER_NOT_FOUND",
        message: "User not found"
      }
    });
  }

  users.splice(index, 1);
  res.status(204).send();
};
