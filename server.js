import dotenv from 'dotenv';
import express from 'express';

dotenv.config();

const server = express();
server.use(express.json());

server.get('/', (req, res) => {
  res.json({ message: 'Welcome to Master Your Money platform' });
});

server.all('*', (req, res) => {
  res.json(`
      Sorry, no such route, try again!
    `);
});

export default server;
