// eslint-disable-next-line consistent-return
const validateId = (req, res, next) => {
  const { id } = req.params;
  const parsedId = parseInt(id, 10);
  if (id.length === '') {
    return res.status(401).json({ error: 'request id should not be empty!' });
  }
  // eslint-disable-next-line no-restricted-globals
  if (isNaN(parsedId) === true) {
    return res.status(401).json({
      error: 'request id must be a number',
    });
  }
  next();
};

export default validateId;
