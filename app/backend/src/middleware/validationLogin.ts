import { Request, Response, NextFunction } from 'express';

const errMessage = { message: 'Incorrect email or password' };

export const validateEmail = (req:Request, res:Response, next:NextFunction) => {
  const { email } = req.body;
  const regex = /^.+@\w+\.\w+$/;

  if (!email) return res.status(400).json({ message: 'All fields must be filled' });
  if (typeof email !== 'string') {
    return res.status(401).json(errMessage);
  }
  if (!regex.test(email)) {
    return res.status(401).json(errMessage);
  }
  next();
};

export const validatePass = (req:Request, res:Response, next:NextFunction) => {
  const { password } = req.body;
  if (!password) return res.status(400).json({ message: 'All fields must be filled' });
  if (typeof password !== 'string') {
    return res.status(401).json(errMessage);
  }
  if (password.length <= 7) {
    return res.status(401).json(errMessage);
  }
  next();
};
