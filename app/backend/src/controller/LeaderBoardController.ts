import { Request, Response, NextFunction } from 'express';
import awayService from '../service/awayService';
import homeService from '../service/homeService';
import leaderboardService from '../service/leaderboardService';

const message = { message: 'Classification not found' };
export default class LeaderBoardController {
  serviceAway = awayService;

  serviceHome = homeService;

  serviceLeaderBoard = leaderboardService;

  public async home(_req: Request, res: Response, __next:NextFunction) {
    try {
      const ranking = await this.serviceHome.leaderHome();
      if (!ranking) return res.status(404).json(message);
      return res.status(200).json(ranking);
    } catch (error) {
      return res.status(500).end();
    }
  }

  public async away(_req: Request, res: Response, __next:NextFunction) {
    try {
      const ranking = await this.serviceAway.leaderAway();
      if (!ranking) return res.status(404).json(message);
      return res.status(200).json(ranking);
    } catch (error) {
      return res.status(500).end();
    }
  }

  public async leaderAll(_req: Request, res: Response, __next:NextFunction) {
    try {
      const ranking = await this.serviceLeaderBoard.leaderAll();
      if (!ranking) return res.status(404).json(message);
      return res.status(200).json(ranking);
    } catch (error) {
      return res.status(500).end();
    }
  }
}
