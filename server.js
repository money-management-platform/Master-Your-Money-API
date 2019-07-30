import dotenv from 'dotenv';
import express from 'express';
import router from './routes';


dotenv.config();

const server = express();
server.use(express.json());
server.use('/api', router);

server.get('/', (req, res) => {
  res.status(200).json({ message: 'Welcome to Master Your Money platform' });
});

server.all('*', (req, res) => {
  res.json(`
      Sorry, no such route, try again!
    `);
});

export default server;
