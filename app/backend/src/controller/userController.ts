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

  public async getUser(req:Request, res:Response, next:NextFunction) {
    try {
      const token = req.headers.authorization;
      if (!token) {
        return res.status(401).json({ message: 'Token not found' });
      }
      const user = this.service.validateToken(token);
      if (Object.keys(user).length === 0) {
        return res.status(401).json({ message: 'Token invalid' });
      }
      const { payloadUser: { role } } = user;
      return res.status(200).json(role);
    } catch (e) {
      next(e);
    }
  }
}
