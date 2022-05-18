import { Request, Response, NextFunction } from 'express';

export const validateEmail = (req:Request, res:Response, next:NextFunction) => {
  const { email } = req.body;
  const regex = /^.+@\w+\.\w+$/;

  if (!email) return res.status(400).json({ message: 'All fields must be filled' });
  if (typeof email !== 'string') {
    return res.status(401).json({ message: 'Incorrect email or password' });
  }
  if (!regex.test(email)) {
    return res.status(401).json({ message: 'Incorrect email or password' });
  }
  next();
};

export const validatePass = (req:Request, res:Response, next:NextFunction) => {
  const { password } = req.body;
  if (!password) return res.status(400).json({ message: 'All fields must be filled' });
  if (typeof password !== 'string') {
    return res.status(401).json({ message: 'Incorrect email or password' });
  }
  if (!password.length <= 7) {
    return res.status(401).json({ message: 'Incorrect email or password' });
  }
  next();
};
