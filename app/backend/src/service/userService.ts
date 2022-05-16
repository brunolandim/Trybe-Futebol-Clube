import * as fs from 'fs';
import { sign, verify, JwtPayload } from 'jsonwebtoken';
import IUser from '../database/interfaces/interface';
import Users from '../database/models/Users';

const SECRET = fs.readFileSync('./jwt.evaluation.key');

export default class UserService {
  model = Users;

  static generateToken(payloadUser:IUser):string {
    const token = sign({ payloadUser }, SECRET, {
      expiresIn: '5d',
      algorithm: 'HS256',
    });
    return token;
  }

  static validateToken(token:string):JwtPayload {
    const decoded = verify(token, SECRET);
    return decoded as JwtPayload;
  }

  public async login(reqPassword:string, reqEmail:string) {
    const user = await this.model.findOne({ where: { email: reqEmail } }) as IUser;
    if (reqPassword === user.password) {
      const token = UserService.generateToken(user);
      const { id, username, role, email, password } = user;

      return { user: { id, username, role, email, password }, token };
    }
    return {};
  }
}
