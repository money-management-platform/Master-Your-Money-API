const incomeValidator = (req, res, next) => {
  const { basis_id, description, estimate } = req.body;
  const income = {
    basis_id, description, estimate,
  };
  if (typeof income.basis_id === 'undefined' || typeof income.description === 'undefined' || typeof income.estimate === 'undefined') {
    return res
      .status(401)
      .json({ errorMessage: 'Please provide basis_id, description and estimate as keys of the new income' });
  }
  if (income.basis_id.trim() === '' || income.description.trim() === '' || income.estimate.trim() === '') {
    return res
      .status(401)
      .json({ errorMessage: 'Please provide values of the keys' });
  }
  next();
};

export default incomeValidator;
