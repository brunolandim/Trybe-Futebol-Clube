import { NextFunction, Request, Response } from 'express';
import UserService from '../service/userService';

const service = new UserService();

export default class UserController {
  public async login(req:Request, res:Response, next:NextFunction) {
    try {
      const { email, password } = req.body;
      const result = await service.login(password, email);
      if (!result) { return res.status(404).json({ message: 'Incorrect email or password' }); }

      const { user, token } = result;
      return res.status(200).json({ user, token });

    } catch (e) {
      next(e);
    }
  }
}
