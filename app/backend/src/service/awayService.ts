import Matches from '../database/models/Matches';
import Teams from '../database/models/Teams';
import { ILeaderBoardAway } from '../interfaces/interface';

export default class LeaderBoardAwayServices {
  public static async getAllLeaderAway() {
    const leaderAway = await Teams.findAll();
    return leaderAway;
  }

  public static getVictories(allMatches: ILeaderBoardAway[]) {
    let victories = 0;
    allMatches.forEach((element) => {
      if (element.homeTeamGoals < element.awayTeamGoals) {
        victories += 1;
      }
    });
    return victories;
  }

  public static getLoses(allMatches: ILeaderBoardAway[]) {
    let loses = 0;
    allMatches.forEach((element) => {
      if (element.homeTeamGoals > element.awayTeamGoals) {
        loses += 1;
      }
    });
    return loses;
  }

  public static getPoints(allMatches: ILeaderBoardAway[]) {
    let points = 0;
    allMatches.forEach((element) => {
      if (element.homeTeamGoals < element.awayTeamGoals) {
        points += 3;
      }
      if (element.homeTeamGoals === element.awayTeamGoals) {
        points += 1;
      }
    });
    return points;
  }

  public static getDraw(allMatches: ILeaderBoardAway[]) {
    let draws = 0;
    allMatches.forEach((element) => {
      if (element.homeTeamGoals === element.awayTeamGoals) {
        draws += 1;
      }
    });
    return draws;
  }

  public static getGoalsFavor(allMatches: ILeaderBoardAway[]) {
    let goals = 0;
    allMatches.forEach((element) => {
      if (element.awayTeamGoals) {
        goals += element.awayTeamGoals;
      }
    });
    return goals;
  }

  public static getGoalsOnw(allMatches: ILeaderBoardAway[]) {
    let goals = 0;
    allMatches.forEach((element) => {
      if (element.homeTeamGoals) {
        goals += element.homeTeamGoals;
      }
    });
    return goals;
  }

  public static getGoalsBalance(allMatches: ILeaderBoardAway[]) {
    const goalsFavor = this.getGoalsFavor(allMatches);
    const goalsOwn = this.getGoalsOnw(allMatches);
    const goals = goalsFavor - goalsOwn;
    return goals;
  }

  public static getEfficienceTeam(allMatches: ILeaderBoardAway[]) {
    const totalPoints = this.getPoints(allMatches);
    const matches = allMatches.length * 3;
    const efficiency = totalPoints / matches;
    return Number((efficiency * 100).toFixed(2));
  }

  public static async getAllMatchesAway() {
    const result = await Matches.findAll({
      where: { inProgress: false },
      include: [{
        model: Teams,
        as: 'teamAway',
        attributes: { exclude: ['id'] },
      }],
    });
    return result as unknown as ILeaderBoardAway[];
  }

  public static async leaderBoardAway() {
    const awayTeams = await this.getAllLeaderAway();
    const matches = await this.getAllMatchesAway();
    const name = awayTeams.map((element) => {
      const away = matches.filter((e) => e.teamAway.teamName === element.teamName);
      return {
        name: element.teamName,
        totalPoints: this.getPoints(away),
        totalGames: away.length,
        totalVictories: this.getVictories(away),
        totalDraws: this.getDraw(away),
        totalLosses: this.getLoses(away),
        goalsFavor: this.getGoalsFavor(away),
        goalsOwn: this.getGoalsOnw(away),
        goalsBalance: this.getGoalsBalance(away),
        efficiency: this.getEfficienceTeam(away),
      };
    });
    return name;
  }

  public static async leaderAway() {
    const leader = await this.leaderBoardAway();
    const result = leader.sort((a, b) => (
      b.totalPoints - a.totalPoints
      || b.totalVictories - a.totalVictories
      || b.goalsBalance - a.goalsBalance
      || b.goalsFavor - a.goalsFavor
      || b.goalsOwn - a.goalsOwn
    ));
    return result;
  }
}
