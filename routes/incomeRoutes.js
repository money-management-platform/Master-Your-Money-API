import express from 'express';
import { getById } from '../models/auth-models';
import verifyToken from '../middlewares/verifyToken';
import IdValidator from '../middlewares/idValidator';
import incomeValidator from '../middlewares/incomeValidator';

import {
  insert,
  getIncomeById,
  getIncome,
  getTotalIncome,
  remove,
  update,
} from '../models/incomeModel';

const incomeRoutes = express.Router();

incomeRoutes.post('/', incomeValidator, verifyToken, async (req, res) => {
  const { basis_id, description, estimate } = req.body;
  const income = {
    user_id: req.decodedToken.sub,
    basis_id,
    description,
    estimate,
  };

  try {
    const newIncome = await insert(income);
    const incomeDetails = await getIncomeById(newIncome[0], req.decodedToken.sub);
    if (income) {
      res.status(201).json({ message: 'new income is created successfully', data: incomeDetails });
    } else {
      res.status(404).json({ message: `The user with the specified ID ${req.params.id} does not exist.` });
    }
  } catch (error) {
    res.status(500).json({ error: 'There was an error while saving the income to the database' });
  }
});

incomeRoutes.get('/', verifyToken, async (req, res) => {
  try {
    const income = await getIncome(req.decodedToken.sub);
    if (income) {
      res.json({ message: 'successful, all income details:', data: income });
    } else {
      res.status(404).json({ message: 'No income available' });
    }
  } catch (err) {
    res.status(500).json({ message: 'Failed to get incomes' });
  }
});

incomeRoutes.get('/:id/users', IdValidator, verifyToken, async (req, res) => {
  try {
    const user = await getById(req.params.id);
    const totalIncome = await getTotalIncome(req.decodedToken.sub);
    const formatTotalIncome = Object.values(totalIncome[0]).toString();

    if (Number(req.params.id) !== Number(req.decodedToken.sub)) {
      return res.status(404).json({ message: 'Sorry, your user id and request id do not mactch!' });
    }
    if (typeof user === 'undefined') {
      return res.status(404).json({ message: `Could not find totalIncome with given ${req.params.id}` });
    }

    if (Number(formatTotalIncome) === 0) {
      return res.json({ message: `Hi ${user.lastname} ${user.firstname}! your total income is $0` });
    }

    if (user) {
      if (formatTotalIncome !== 'undefined') {
        return res.json({ message: `Hi ${user.lastname} ${user.firstname}! your total income is: $${formatTotalIncome}` });
      }
    }
  } catch (err) {
    return res.status(500).json({ message: 'Failed to get totalIncomes' });
  }
});

incomeRoutes.get('/:id', IdValidator, verifyToken, async (req, res) => {
  try {
    const income = await getIncomeById(req.params.id, req.decodedToken.sub);
    if (income) {
      res.json({ message: 'successful!, expense details:', data: income });
    } else {
      res.status(404).json({ message: `Could not find income with given ${req.params.id}` });
    }
  } catch (err) {
    res.status(500).json({ message: 'Failed to get incomes' });
  }
});

incomeRoutes.delete('/:id', IdValidator, verifyToken, async (req, res) => {
  try {
    const income = await remove(req.params.id, req.decodedToken.sub);
    if (!income) {
      return res
        .status(404)
        .json({ message: `The income with the ${req.params.id} does not exist.` });
    }
    res
      .status(200)
      .json({ message: `The income with the ${req.params.id} has been removed` });
  } catch (error) {
    return res.status(500).json({ error: 'The income could not be removed' });
  }
});

incomeRoutes.put('/:id', IdValidator, incomeValidator, verifyToken, async (req, res) => {
  const { basis_id, description, estimate } = req.body;
  const income = {
    basis_id,
    description,
    estimate,
  };

  try {
    const item = await getIncomeById(req.params.id, req.decodedToken.sub);
    if (!item) {
      return res
        .status(404)
        .json({ message: `income with ID:${req.params.id} not found` });
    }
    await update(item.id, income);
    const editedIncome = await getIncomeById(item.id, req.decodedToken.sub);
    return res
      .status(200)
      .json({ message: 'income updated successfully', data: editedIncome });
  } catch (error) {
    return res
      .status(500)
      .json({ error: 'The income information could not be updated.' });
  }
});

export default incomeRoutes;
