const auth = (req, res, next) => {
  if (req.headers['x-api-key'] !== '12345') {
    return res.status(401).json({
      error: {
        code: 'UNAUTHORIZED',
        message: 'Missing or invalid API key'
      }
    });
  }

  next();
};

module.exports = auth;