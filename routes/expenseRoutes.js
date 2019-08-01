import express from 'express';
import { getById } from '../models/auth-models';
import verifyToken from '../middlewares/verifyToken';
import IdValidator from '../middlewares/idValidator';
import expenseValidator from '../middlewares/expenseValidator';
import { getTotalIncome } from '../models/incomeModel';

import {
  insert,
  getExpenseById,
  getExpense,
  getTotalExpense,
  remove,
  update,
} from '../models/expenseModel';

const expenseRoutes = express.Router();

expenseRoutes.post('/expenses', verifyToken, expenseValidator, async (req, res) => {
  const { category_id, description, amount } = req.body;
  const expense = {
    user_id: req.decodedToken.sub,
    category_id,
    description,
    amount,
  };
  try {
    const newExpense = await insert(expense);
    const expenseDetails = await getExpenseById(newExpense[0], req.decodedToken.sub);
    if (expense) {
      res.status(201).json({ message: 'new expense is posted successfully', data: expenseDetails });
    } else {
      res.status(404).json({ message: `The user with the specified ID ${req.params.id} does not exist.` });
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: 'There was an error while saving the expense to the database' });
  }
});

expenseRoutes.get('/expenses/', verifyToken, async (req, res) => {
  try {
    const expense = await getExpense(req.decodedToken.sub);
    if (expense) {
      res.json(expense);
    } else {
      res.status(404).json({ message: 'No expense available' });
    }
  } catch (err) {
    res.status(500).json({ message: 'Failed to get expenses' });
  }
});

expenseRoutes.get('/expenses/:id/users', IdValidator, verifyToken, async (req, res) => {
  try {
    const totalExpense = await getTotalExpense(req.params.id);
    const formatTotalExpense = Object.values(totalExpense[0]).toString();
    const user = await getById(req.params.id);
    if (Number(req.params.id) !== Number(req.decodedToken.sub)) {
      return res.status(404).json({ message: 'Sorry, your user id and request id do not mactch!' });
    }
    if (user) {
      if (Number(formatTotalExpense) === 0) {
        return res.json({ message: `Hi ${user.lastname} ${user.firstname}! your total expense is $0` });
      }
      if (totalExpense && totalExpense !== 0) {
        res.json({ message: `Hi ${user.lastname} ${user.firstname}! your total expense is: $${formatTotalExpense}` });
      } else {
        res.status(404).json({ message: `Hi ${user.lastname} ${user.firstname}! your total expense is: $0` });
      }
    } else {
      res.status(404).json({ message: `Hi there!, the user with id:${req.params.id} does not exist` });
    }
  } catch (err) {
    res.status(500).json({ message: 'Failed to get totalExpenses' });
  }
});

expenseRoutes.get('/expenses/:id', IdValidator, verifyToken, async (req, res) => {
  try {
    const expense = await getExpenseById(req.params.id, req.decodedToken.sub);
    if (expense) {
      res.json({ message: expense });
    } else {
      res.status(404).json({ message: `Could not find expense with given ${req.params.id}` });
    }
  } catch (err) {
    res.status(500).json({ message: 'Failed to get expenses' });
  }
});


expenseRoutes.delete('/expenses/:id', IdValidator, verifyToken, async (req, res) => {
  const expense = await remove(req.params.id, req.decodedToken.sub);
  try {
    if (!expense) {
      return res
        .status(404)
        .json({ message: `The expenses with the ${req.params.id} does not exist.` });
    }
    res
      .status(200)
      .json({ message: `The expenses with the ${req.params.id} has been removed` });
  } catch (error) {
    return res.status(500).json({ error: 'The expenses could not be removed' });
  }
});

expenseRoutes.put('/expenses/:id', IdValidator, expenseValidator, verifyToken, async (req, res) => {
  const { category_id, description, amount } = req.body;
  const expense = {
    category_id,
    description,
    amount,
  };

  try {
    const item = await getExpenseById(req.params.id, req.decodedToken.sub);
    if (!item) {
      return res
        .status(404)
        .json({ message: `expense with ID:${req.params.id} not found` });
    }
    await update(item.id, expense);
    const editedExpense = await getExpenseById(item.id, req.decodedToken.sub);
    return res
      .status(200)
      .json({ message: 'expense updated successfully', data: editedExpense });
  } catch (error) {
    return res
      .status(500)
      .json({ error: 'The expense information could not be updated.' });
  }
});

expenseRoutes.post('/purchases', verifyToken, async (req, res) => {
  const { category_id, description, amount } = req.body;
  const purchase = {
    user_id: req.decodedToken.sub,
    category_id,
    description,
    amount,
  };
  try {
    const totalIncome = await getTotalIncome(req.decodedToken.sub);
    const formatTotalIncome = Object.values(totalIncome[0]).toString();
    const cost = Number(purchase.amount);
    const currentTotalIncome = Number(formatTotalIncome);
    const balance = currentTotalIncome - amount;
    const user = await getById(req.decodedToken.sub);
    if (cost < currentTotalIncome) {
      res.status(200).json({
        message: ` Hi! ${user.firstname} ${user.lastname} you can afford this ${purchase.description} now and your balance will be $${balance}`,
      });
    }
    if (cost > currentTotalIncome) {
      res.status(200).json({ message: ` Hi! ${user.firstname} ${user.lastname} you will not be able to afford this ${purchase.description} at the moment` });
    }
    if (cost === currentTotalIncome) {
      res.status(200).json({
        message: ` Hi! ${user.firstname} ${user.lastname} you can afford it, this -- ${purchase.description} now, but you will be left with $${balance}, are you sure you want to do this ?`,
      });
    }
  } catch (error) {
    res.status(500).json({ error: 'There was an error while making your request' });
  }
});


export default expenseRoutes;
