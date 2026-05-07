const validateTaskTitle = (req, res, next) => {
  const { title } = req.body;

  if (typeof title !== 'string' || title.trim() === '') {
    return res.status(400).json({
      error: {
        code: 'INVALID_INPUT',
        message: 'Field "title" is required and must be a non-empty string'
      }
    });
  }

  next();
};

module.exports = validateTaskTitle;