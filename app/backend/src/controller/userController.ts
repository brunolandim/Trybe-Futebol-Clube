import { NextFunction, Request, Response } from 'express';
import UserService from '../service/userService';

export default class UserController {
  public service : UserService;

  constructor() {
    this.service = new UserService();
  }

  public async login(req:Request, res:Response, next:NextFunction) {
    try {
      const { email, password } = req.body;
      const result = await this.service.login(password, email);
      if (Object.keys(result).length === 0) {
        return res.status(401).json({ message: 'Incorrect email or password' });
      }
      const { user, token } = result;
      return res.status(200).json({ user, token });
    } catch (e) {
      next(e);
    }
  }
}
