const expenseValidator = (req, res, next) => {
  const { category_id, description, amount } = req.body;
  const expense = {
    category_id, description, amount,
  };
  if (typeof expense.category_id === 'undefined' || typeof expense.description === 'undefined' || typeof expense.amount === 'undefined') {
    return res
      .status(401)
      .json({ errorMessage: 'Please provide category_id, description and amount as keys of the new expense' });
  }
  if (expense.category_id.trim() === '' || expense.description.trim() === '' || expense.amount.trim() === '') {
    return res
      .status(401)
      .json({ errorMessage: 'Please provide values of the keys' });
  }
  next();
};

export default expenseValidator;
