import { Request, Response, NextFunction } from 'express';
const jwt = require('jsonwebtoken');
import { config } from "dotenv";

config();

interface AuthRequest extends Request {
  user?: { [key: string]: any };
}

const auth = (req: AuthRequest, res: Response, next: NextFunction) => {
  const authHeader = req.header('Authorization');

  if (!authHeader) {
    return res.status(401).json({ msg: 'No hay token, permiso no válido' });
  }

  try {
    const token = authHeader.split(' ')[1];
    const user = jwt.verify(token, process.env.SIGN_JWT!) as { [key: string]: any };

    req.user = user;

    return next();
  } catch (error) {
    console.error(error);
    return res.status(401).json({ msg: 'Token no válido' });
  }
};

export default auth;