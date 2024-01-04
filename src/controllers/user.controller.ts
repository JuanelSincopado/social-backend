import { Response } from 'express';
import User, { IUser } from '../model/User';
import CustomRequest from '../helps/custom_request';
import hashPassword from '../helps/hash_password';

export const createUser = async (req: CustomRequest<IUser>, res: Response) => {
  try {
    const { name, email, password } = req.body;

    const user = await User.findOne({ email });

    if (user) {
      return res.status(400).json({ msg: 'El correo ya existe' });
    }

    const hashedPassword = await hashPassword(password);

    const newUser: IUser = new User({
      name,
      email,
      password: hashedPassword
    });

    await newUser.save();

    res.status(201).json(newUser);
  } catch (error) {
    console.error(error);
    res.status(500).send('Error interno del servidor');
  }
};

export const getUsers = async (req: CustomRequest<IUser>, res: Response) => {
  try {
    const users = await User.find();
    res.json(users);
  } catch (error) {
    console.error(error);
    res.status(500).send('Error interno del servidor');
  }
};