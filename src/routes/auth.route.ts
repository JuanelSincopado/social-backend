import { Router } from 'express';
import { authUser, authenticatedUser } from '../controllers/auth.controller';
import auth from '../middleware/auth';

const authRoutes = Router();

authRoutes.post('/', authUser);
authRoutes.get('/', auth, authenticatedUser);


export default authRoutes;