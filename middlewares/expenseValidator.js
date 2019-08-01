const expenseValidator = (req, res, next) => {
  const { category_id, description, estimate } = req.body;
  const expense = {
    category_id, description, estimate,
  };
  if (typeof expense.category_id === 'undefined' || typeof expense.description === 'undefined' || typeof expense.estimate === 'undefined') {
    return res
      .status(401)
      .json({ errorMessage: 'Please provide category_id, description and estimate as keys of the new expense' });
  }
  if (expense.category_id.trim() === '' || expense.description.trim() === '' || expense.estimate.trim() === '') {
    return res
      .status(401)
      .json({ errorMessage: 'Please provide values of the keys' });
  }
  next();
};

export default expenseValidator;
