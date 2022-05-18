import * as express from 'express';
import { validateEmail, validatePass } from '../middleware/validationLogin';
import UserController from '../controller/userController';

const userController = new UserController();
const userRouter: express.Router = express.Router();

userRouter.post('/', validateEmail, validatePass, userController.login);

export default userRouter;
