import { NextFunction, Request, Response } from 'express';
import TeamService from '../service/teamService';

export default class TeamController {
  public service:TeamService;

  constructor() {
    this.service = new TeamService();
  }

  public async getAll(__req:Request, res:Response, __next:NextFunction) {
    try {
      const getTeam = await this.service.getAll();

      return res.status(200).json(getTeam);
    } catch (e) {
      return res.status(500).end();
    }
  }

  public async getById(req:Request, res:Response, __next:NextFunction) {
    try {
      const { id } = req.params;
      const team = await this.service.getById(Number(id));
      if (Object.keys(team).length === 0) {
        return res.status(404).json({ message: 'Team not found' });
      }

      return res.status(200).json(team);
    } catch (e) {
      return res.status(500).end();
    }
  }
}
