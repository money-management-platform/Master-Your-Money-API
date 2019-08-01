const loginValidator = (req, res, next) => {
  const { email, password } = req.body;
  const user = {
    email, password,
  };
  if (typeof user.email === 'undefined' || typeof user.password === 'undefined') {
    return res
      .status(401)
      .json({ errorMessage: 'Please email or password is missing' });
  }
  if (user.email.trim() === '' || user.password.trim() === '') {
    return res
      .status(401)
      .json({ errorMessage: 'Please provide email and password!' });
  }
  next();
};

export default loginValidator;
