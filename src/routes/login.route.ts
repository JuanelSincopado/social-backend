import { Router } from 'express';

const loginRoutes = Router();

loginRoutes.get('/', (req, res) => {
  res.send('login');
});

loginRoutes.post('/', (req, res) => {
  res.send('login');
});

export default loginRoutes;