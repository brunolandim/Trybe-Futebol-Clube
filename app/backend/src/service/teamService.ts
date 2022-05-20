import { ITeam } from '../interfaces/interface';
import Teams from '../database/models/Teams';

export default class TeamService {
  model = Teams;

  public async getAll():Promise<ITeam[]> {
    const teams = await this.model.findAll();

    return teams as ITeam[];
  }

  public async getById(id:number):Promise<ITeam | object> {
    const team = await this.model.findByPk(id);
    if (!team) {
      return {};
    }

    return team as ITeam;
  }
}
