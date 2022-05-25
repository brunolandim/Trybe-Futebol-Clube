import * as express from 'express';
import LeaderBoardController from '../controller/LeaderBoardController';

const leaderBoardController = new LeaderBoardController();
const leaderRouter:express.Router = express.Router();

leaderRouter.get('/home', (req, res, next) => leaderBoardController.home(req, res, next));
leaderRouter.get('/away', (req, res, next) => leaderBoardController.away(req, res, next));
leaderRouter.get('/', (req, res, next) => leaderBoardController.leaderAll(req, res, next));

export default leaderRouter;
