import * as express from 'express';
import TeamController from '../controller/teamController';

const teamControler = new TeamController();
const teamRouter:express.Router = express.Router();

teamRouter.get(
  '/',
  (req, res, next) => teamControler.getAll(req, res, next),
);
teamRouter.get('/:id', (req, res, next) => teamControler.getById(req, res, next));

export default teamRouter;
