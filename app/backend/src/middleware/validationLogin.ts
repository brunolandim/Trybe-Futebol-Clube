import { Request, Response, NextFunction } from 'express';
import { verify } from 'jsonwebtoken';
import * as fs from 'fs';
import { ITokenData } from '../interfaces/interface';

const SECRET = fs.readFileSync('./jwt.evaluation.key');

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
export const validateToken = (req:ITokenData, res:Response, next:NextFunction) => {
  try {
    const token = req.headers.authorization;

    if (!token) return res.status(401).json({ message: 'Token Not Found' });

    const decode = verify(token, SECRET);
    if (typeof decode === 'string') return res.status(401).json({ message: 'Not a string' });

    req.payloadUser = decode.data;
    next();
  } catch (e) {
    return res.status(401).json({ message: 'Invalid Token' });
  }
};
