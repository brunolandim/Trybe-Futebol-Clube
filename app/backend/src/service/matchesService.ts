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
}
