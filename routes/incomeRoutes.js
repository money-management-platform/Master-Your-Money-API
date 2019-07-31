import express from 'express';
import { getById } from '../models/auth-models';
import {
  insert,
  getIncomeById,
  getIncome,
  getTotalIncome,
  remove,
} from '../models/incomeModel';

const incomeRoutes = express.Router();


incomeRoutes.post('/:id', async (req, res) => {
  const user = await getById(req.params.id);
  const { basis_id, description, estimate } = req.body;
  const income = {
    user_id: req.params.id,
    basis_id,
    description,
    estimate,
  };

  try {
    if (user) {
      if (income) {
        const newIncome = await insert(income);
        const incomeDetails = await getIncomeById(newIncome.id);
        res.status(201).json({ message: 'new income is created successfully', data: incomeDetails });
      }
    } else {
      res.status(404).json({ message: `The user with the specified ID ${req.params.id} does not exist.` });
    }
  } catch (error) {
    res.status(500).json({ error: 'There was an error while saving the income to the database' });
  }
});

incomeRoutes.get('/', async (req, res) => {
  try {
    const income = await getIncome();
    if (income) {
      res.json(income);
    } else {
      res.status(404).json({ message: 'No income available' });
    }
  } catch (err) {
    res.status(500).json({ message: 'Failed to get incomes' });
  }
});

incomeRoutes.get('/:id/users', async (req, res) => {
  const user = await getById(req.params.id);
  const totalIncome = await getTotalIncome(req.params.id);
  const formatTotalIncome = Object.values(totalIncome[0]).toString();
  try {
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

incomeRoutes.get('/:id', async (req, res) => {
  try {
    const income = await getIncomeById(req.params.id);
    if (income) {
      res.json({ message: income });
    } else {
      res.status(404).json({ message: `Could not find income with given ${req.params.id}` });
    }
  } catch (err) {
    res.status(500).json({ message: 'Failed to get incomes' });
  }
});


incomeRoutes.delete('/:id', async (req, res) => {
  const income = await remove(Number(req.params.id));
  try {
    if (!income) {
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

export default incomeRoutes;
