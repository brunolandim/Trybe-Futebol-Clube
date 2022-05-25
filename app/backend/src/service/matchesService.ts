import { IMatch } from '../interfaces/interface';
import Matches from '../database/models/Matches';
import Teams from '../database/models/Teams';

export default class MatchesService {
  modelTeam = Teams;

  modelMatch = Matches;

  public async getMachers() {
    const allMatchers = await this.modelMatch.findAll({
      include: [{ model: this.modelTeam, as: 'teamHome', attributes: { exclude: ['id'] } },
        { model: this.modelTeam, as: 'teamAway', attributes: { exclude: ['id'] } }],
    });
    return allMatchers;
  }

  public async inProgressMatch() {
    const inProgressTrue = await this.modelMatch.findAll({
      where: { inProgress: true },
      include: [{ model: this.modelTeam, as: 'teamHome', attributes: { exclude: ['id'] } },
        { model: this.modelTeam, as: 'teamAway', attributes: { exclude: ['id'] } }],
    });
    return inProgressTrue;
  }

  public async InProgressMatchFalse() {
    const inProgressFalse = await this.modelMatch.findAll({
      where: { inProgress: false },
      include: [{ model: this.modelTeam, as: 'teamHome', attributes: { exclude: ['id'] } },
        { model: this.modelTeam, as: 'teamAway', attributes: { exclude: ['id'] } }],
    });
    return inProgressFalse;
  }

  public async createMach(match :IMatch, home:number, away:number) {
    const fistTeam = await this.modelTeam.findByPk(home);
    const secondTeams = await this.modelTeam.findByPk(away);

    if (!fistTeam || !secondTeams) {
      return 'There is no team with such id!';
    }

    if (fistTeam.id === secondTeams.id) {
      return 'It is not possible to create a match with two equal teams';
    }
    const newMatch = await this.modelMatch.create({ ...match });

    return newMatch;
  }

  public async updateMatch(id:number, payload:object) {
    const [update] = await this.modelMatch.update({ ...payload }, { where: { id } });
    return update;
  }

  public async finishMatch(id:number) {
    const [finish] = await this.modelMatch.update({ inProgress: false }, { where: { id } });
    return finish;
  }
}
