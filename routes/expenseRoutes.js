import express from 'express';
import { getById } from '../models/auth-models';
import {
  insert,
  getExpenseById,
  getExpense,
  getTotalExpense,
  remove,
} from '../models/expenseModel';

const expenseRoutes = express.Router();

expenseRoutes.post('/:id', async (req, res) => {
  const user = await getById(req.params.id);
  const { category_id, description, amount } = req.body;
  const expense = {
    user_id: req.params.id,
    category_id,
    description,
    amount,
  };

  try {
    if (user) {
      if (expense) {
        const newExpense = await insert(expense);
        const expenseDetails = await getExpenseById(newExpense.id);
        res.status(201).json({ message: 'new expense is posted successfully', data: expenseDetails });
      }
    } else {
      res.status(404).json({ message: `The user with the specified ID ${req.params.id} does not exist.` });
    }
  } catch (error) {
    res.status(500).json({ error: 'There was an error while saving the expense to the database' });
  }
});

expenseRoutes.get('/', async (req, res) => {
  try {
    const expense = await getExpense();
    if (expense) {
      res.json(expense);
    } else {
      res.status(404).json({ message: 'No expense available' });
    }
  } catch (err) {
    res.status(500).json({ message: 'Failed to get expenses' });
  }
});

expenseRoutes.get('/:id/users', async (req, res) => {
  try {
    const totalExpense = await getTotalExpense(req.params.id);
    const formatTotalExpense = Object.values(totalExpense[0]).toString();
    const user = await getById(req.params.id);
    if (user) {
      if (totalExpense && totalExpense !== 0) {
        res.json({ message: `Hi ${user.lastname} ${user.firstname}! your total expense is: $${formatTotalExpense}` });
      } else {
        res.status(404).json({ message: `Hi ${user.lastname} ${user.firstname}! your total expense is: $0` });
      }
    } else {
      res.status(404).json({ message: `Hi there!, the user with id:${req.params.id} does not exist` });
    }
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: 'Failed to get totalExpenses' });
  }
});

expenseRoutes.get('/:id', async (req, res) => {
  try {
    const expense = await getExpenseById(req.params.id);
    if (expense) {
      res.json({ message: expense });
    } else {
      res.status(404).json({ message: `Could not find expense with given ${req.params.id}` });
    }
  } catch (err) {
    res.status(500).json({ message: 'Failed to get expenses' });
  }
});


expenseRoutes.delete('/:id', async (req, res) => {
  const expense = await remove(Number(req.params.id));
  try {
    if (!expense) {
      return res
        .status(404)
        .json({ message: `The user with the ${req.params.id} does not exist.` });
    }
    res
      .status(200)
      .json({ message: `The user with the ${req.params.id} has been removed` });
  } catch (error) {
    return res.status(500).json({ error: 'The user could not be removed' });
  }
});

export default expenseRoutes;
