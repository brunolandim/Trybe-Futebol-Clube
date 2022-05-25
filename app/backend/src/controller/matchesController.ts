import { NextFunction, Request, Response } from 'express';
import UserService from '../service/userService';
import MatchesService from '../service/matchesService';

const idEqual = { message: 'It is not possible to create a match with two equal teams' };
const badRequest = { message: 'There is no team with such id!' };

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

  public async update(req:Request, res:Response, __next:NextFunction) {
    try {
      const { id } = req.params;
      const { homeTeamGoals, awayTeamGoals } = req.body;

      const payload = { homeTeamGoals, awayTeamGoals };

      const updateMatch = await this.service.updateMatch(Number(id), payload);
      return res.status(200).json(updateMatch);
    } catch (error) {
      return res.status(500).end();
    }
  }

  public async finish(req:Request, res:Response, __next:NextFunction) {
    try {
      const { id } = req.params;
      await this.service.finishMatch(Number(id));
      return res.status(200).json({ message: 'Finished' });
    } catch (error) {
      return res.status(500).end();
    }
  }

  public async create(req:Request, res:Response, __next:NextFunction) {
    try {
      const { homeTeam, awayTeam, homeTeamGoals, awayTeamGoals } = req.body;
      const Match = await this.service.createMach({ homeTeam,
        awayTeam,
        homeTeamGoals,
        awayTeamGoals,
        inProgress: true }, homeTeam, awayTeam);

      if (Match === 'It is not possible to create a match with two equal teams') {
        return res.status(401).json(idEqual);
      }
      if (Match === 'There is no team with such id!') return res.status(404).json(badRequest);

      return res.status(201).json(Match);
    } catch (e) {
      return res.status(500).end();
    }
  }
}
