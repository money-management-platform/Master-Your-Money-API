import express from 'express';
import userRoutes from './authRoutes';
import incomeRoutes from './incomeRoutes'

const route = express.Router();

route.use('/auth', userRoutes);
route.use('/users', userRoutes);
route.use('/incomes', incomeRoutes);

export default route;
