import express from 'express';
import bcrypt from 'bcryptjs';
import { insert, get, getUserByEmail } from '../models/auth-models';
import hashPassword from '../helpers/passwordHelper';
import generateToken from '../helpers/generateToken';
import verifyToken from '../middlewares/verifyToken';


const userRoutes = express.Router();

userRoutes.post('/register', (req, res) => {
  const {
    firstname, lastname, email, password: pwd, address, occupation, phone, marital_status,
  } = req.body;
  const password = hashPassword(pwd);
  const user = {
    firstname,
    lastname,
    email,
    password,
    address,
    occupation,
    phone,
    marital_status,
  };

  insert(user)
    .then(data => res
      .status(201)
      .json({ message: 'user  created successfully', data: user }))
    .catch((error) => {
      if (error.code.includes('SQLITE_CONSTRAINT')) {
        return res.status(409).json({
          status: 409,
          error: 'email cannot be registered twice',
        });
      }
      return res
        .status(500)
        .json({ error: 'The users information could not be created.' });
    });
});

userRoutes.get('/', (req, res) => {
  get()
    .then((data) => {
      if (data.length === 0) {
        res.status(404).json({ message: 'users not found' });
      }
      res.status(200).json(data);
    })
    .catch((error) => {
      res
        .status(500)
        .json({ error: 'The users information could not be retrieved.' });
    });
});


export default userRoutes;
