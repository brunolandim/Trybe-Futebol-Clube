import { NextFunction, Request, Response } from 'express';
import UserService from '../service/userService';
import MatchesService from '../service/matchesService';

export default class MatchesController {
  public service:MatchesService;

  public userService:UserService;

  constructor() {
    this.service = new MatchesService();
    this.userService = new UserService();
  }

  public async statusMach(req:Request, res:Response, __next:NextFunction) {
    const { inProgress } = req.query;
    try {
      if (inProgress === 'true') {
        const inProgressMachTrue = await this.service.inProgressMatch();
        return res.status(201).json(inProgressMachTrue);
      }
      if (inProgress === 'false') {
        const inProgressMachFalse = await this.service.InProgressMatchFalse();
        return res.status(201).json(inProgressMachFalse);
      }
    } catch (e) {
      return res.status(500).end();
    }
  }

  public async getAllMatches(req:Request, res:Response, __next:NextFunction) {
    try {
      const { inProgress } = req.query;

      if (inProgress) {
        const result = await this.statusMach(req, res, __next);
        return result;
      }

      const match = await this.service.getMachers();

      return res.status(201).json(match);
    } catch (e) {
      return res.status(500).end();
    }
  }

  public async create(req:Request, res:Response, __next:NextFunction) {
    try {
      const { homeTeam, awayTeam, homeTeamGoals, awayTeamGoals } = req.body;
      const newMatch = await this.service.createMach({ homeTeam,
        awayTeam,
        homeTeamGoals,
        awayTeamGoals,
        inProgress: true });
      if (Object.keys(newMatch).length === 0) {
        return res.status(404).json({
          message: 'It is not possible to create a match with two equal teams"',
        });
      }
      return res.status(201).json(newMatch);
    } catch (e) {
      return res.status(500).end();
    }
  }
}
