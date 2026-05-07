const parseId = (value, resourceName) => {
  const id = Number.parseInt(value, 10);
  if (Number.isNaN(id)) {
    return { error: `${resourceName} id must be a number` };
  }
  return { id };
};

module.exports = {
  parseId
};