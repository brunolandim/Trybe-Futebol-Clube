import * as express from 'express';
import { validateToken } from '../middleware/validationLogin';
import MatchesController from '../controller/matchesController';

const matchesController = new MatchesController();
const matchRouter:express.Router = express.Router();

matchRouter.get('/', (req, res, next) => matchesController.getAllMatches(req, res, next));
matchRouter.post(
  '/',
  validateToken,
  (req, res, next) => matchesController.create(req, res, next),
);
matchRouter.patch('/:id/finish', (req, res, next) => matchesController.finish(req, res, next));
matchRouter.patch('/:id', (req, res, next) => matchesController.update(req, res, next));

export default matchRouter;
