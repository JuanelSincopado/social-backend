import { Router } from 'express';
import { createUser, getUsers, getUser, updateUser, updateUserPassword } from '../controllers/user.controller';
import auth from '../middleware/auth';

const userRouter = Router();

userRouter.get('/', getUsers);

userRouter.get('/:id', getUser);

userRouter.post('/', createUser);

userRouter.put('/update/:id', auth, updateUser);

userRouter.put('/update-password/:id', auth, updateUserPassword);

export default userRouter;