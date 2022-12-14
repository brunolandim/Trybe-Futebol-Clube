import * as fs from 'fs';
import { sign, verify, JwtPayload } from 'jsonwebtoken';
import { compareSync } from 'bcryptjs';
import { IUser } from '../interfaces/interface';
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

  public validateToken(token:string):JwtPayload {
    const decoded = verify(token, SECRET) as JwtPayload;
    if (!decoded) {
      return {};
    }
    return { ...decoded, secret: token };
  }

  public async login(reqPassword:string, reqEmail:string) {
    const user = await this.model.findOne({ where: { email: reqEmail } }) as IUser;
    if (!user || !compareSync(reqPassword, user.password)) return {};

    const token = UserService.generateToken(user);

    const { id, username, role, email } = user;
    return { user: { id, username, role, email }, token };
  }
}
