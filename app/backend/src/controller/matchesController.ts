import { NextFunction, Request, Response } from 'express';
import MatchesService from '../service/matchesService';

export default class MatchesController {
  public service:MatchesService;

  constructor() {
    this.service = new MatchesService();
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
}
