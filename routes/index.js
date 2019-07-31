import express from 'express';
import userRoutes from './authRoutes';
import incomeRoutes from './incomeRoutes';
import expenseRoutes from './expenseRoutes'

const route = express.Router();

route.use('/auth', userRoutes);
route.use('/users', userRoutes);
route.use('/incomes', incomeRoutes);
route.use('/expenses', expenseRoutes);

export default route;
