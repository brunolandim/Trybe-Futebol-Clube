import * as express from 'express';
import UserController from '../controller/userController';

const userController = new UserController();
const userRouter: express.Router = express.Router();

userRouter.post('/', userController.login);

export default userRouter;
