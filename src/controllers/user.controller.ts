import { Response } from 'express';
import User, { IUser } from '../model/User';
import CustomRequest from '../helps/custom_request';
import { hashPassword } from '../helps/hash_password';

export const createUser = async (req: CustomRequest<IUser>, res: Response) => {
  try {
    const { fullName, age, email, password } = req.body;

    if (!fullName || !age || !email || !password) {
      return res.status(400).json({ msg: 'Por favor ingrese todos los campos' });
    }

    if (!Number.isInteger(age)) {
      return res.status(400).json({ msg: 'Ingese una edad válida' });
    }

    const exist = await User.findOne({ email });

    if (exist) {
      return res.status(400).json({ msg: 'El correo ya existe' });
    }

    const hashedPassword = await hashPassword(password);

    const newUser: IUser = new User({
      fullName,
      age,
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

export const getUser = async (req: CustomRequest<IUser>, res: Response) => {
  try {
    const user = await User.findById(req.params.id);
    res.json(user);
  } catch (error) {
    console.error(error);
    res.status(500).send('Error interno del servidor');
  }
};

export const updateUser = async (req: CustomRequest<IUser>, res: Response) => {
  try {
    const { fullName, age, email } = req.body;

    if (!fullName || !age || !email) {
      return res.status(400).json({ msg: 'Por favor ingrese todos los campos' });
    }

    if (!Number.isInteger(age)) {
      return res.status(400).json({ msg: 'Ingese una edad válida' });
    }

    const user = await User.findByIdAndUpdate(req.params.id, {
      fullName,
      age,
      email,
    });

    res.json(user);
  } catch (error) {
    console.error(error);
    res.status(500).send('Error interno del servidor');
  }
}

export const updateUserPassword = async (req: CustomRequest<IUser>, res: Response) => {
  try {
    const { password } = req.body;

    if (!password) {
      return res.status(400).json({ msg: 'Por favor ingrese todos los campos' });
    }

    const hashedPassword = await hashPassword(password);

    const user = await User.findByIdAndUpdate(req.params.id, {
      password: hashedPassword
    });

    res.json(user);
  } catch (error) {
    console.error(error);
    res.status(500).send('Error interno del servidor');
  }
}