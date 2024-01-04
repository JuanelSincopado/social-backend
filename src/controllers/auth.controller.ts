import { NextFunction, Response } from 'express';
const jwt = require('jsonwebtoken');
import { config } from "dotenv";
import CustomRequest from '../helps/custom_request';
import ILogin from '../model/Login';
import User from '../model/User';
import { comparePassword } from '../helps/hash_password';

config();

export const authUser = async (req: CustomRequest<ILogin>, res: Response) => {

  const { email, password } = req.body;

  const user = await User.findOne({ email });

  if (!user) {
    return res.status(400).json({ msg: 'El correo no existe' });
  }

  if (await comparePassword(password, user.password)) {

    const token = jwt.sign({
      id: user._id,
      email: user.email
    },
      process.env.SIGN_JWT!,
      { expiresIn: 60 * 60 * 24 }
    )

    return res.json({
      user,
      token
    });

  } else {
    return res.status(400).json({ msg: 'Contraseña incorrecta' });
  }
}

export const authenticatedUser = (req: CustomRequest<ILogin>, res: Response, next: NextFunction) => {
  res.json({ msg: 'Usuario autenticado' })
}