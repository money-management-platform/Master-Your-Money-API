import express from 'express';
import userRoutes from './auth-routes';

const route = express.Router();

route.use('/auth', userRoutes);
route.use('/users', userRoutes);

export default route;
