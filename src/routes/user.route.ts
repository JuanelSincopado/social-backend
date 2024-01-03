import { Router } from 'express';

const userRouter = Router();

userRouter.get('/', (req, res) => {
  res.send('register');
});

userRouter.post('/', (req, res) => {
  res.send('register');
});

export default userRouter;