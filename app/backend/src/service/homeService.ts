import Matches from '../database/models/Matches';
import Teams from '../database/models/Teams';
import { ILeaderBoardHome } from '../interfaces/interface';

export default class LeaderBoardHomeServices {
  public static async getAllLeaderHome() {
    const leaderHome = await Teams.findAll();
    return leaderHome;
  }

  public static getVictories(allMatches: ILeaderBoardHome[]) {
    let victories = 0;
    allMatches.forEach((element) => {
      if (element.homeTeamGoals > element.awayTeamGoals) {
        victories += 1;
      }
    });
    return victories;
  }

  public static getLoses(allMatches: ILeaderBoardHome[]) {
    let loses = 0;
    allMatches.forEach((element) => {
      if (element.homeTeamGoals < element.awayTeamGoals) {
        loses += 1;
      }
    });
    return loses;
  }

  public static getPoints(allMatches: ILeaderBoardHome[]) {
    let points = 0;
    allMatches.forEach((element) => {
      if (element.homeTeamGoals > element.awayTeamGoals) {
        points += 3;
      }
      if (element.homeTeamGoals === element.awayTeamGoals) {
        points += 1;
      }
    });
    return points;
  }

  public static getDraw(allMatches: ILeaderBoardHome[]) {
    let draws = 0;
    allMatches.forEach((element) => {
      if (element.homeTeamGoals === element.awayTeamGoals) {
        draws += 1;
      }
    });
    return draws;
  }

  public static getGoalsFavor(allMatches: ILeaderBoardHome[]) {
    let goals = 0;
    allMatches.forEach((element) => {
      if (element.homeTeamGoals) {
        goals += element.homeTeamGoals;
      }
    });
    return goals;
  }

  public static getGoalsOnw(allMatches: ILeaderBoardHome[]) {
    let goals = 0;
    allMatches.forEach((element) => {
      if (element.awayTeamGoals) {
        goals += element.awayTeamGoals;
      }
    });
    return goals;
  }

  public static getGoalsBalance(allMatches: ILeaderBoardHome[]) {
    const goalsFavor = this.getGoalsFavor(allMatches);
    const goalsOwn = this.getGoalsOnw(allMatches);
    const goals = goalsFavor - goalsOwn;
    return goals;
  }

  public static getEfficienceTeam(allMatches: ILeaderBoardHome[]) {
    const totalPoints = this.getPoints(allMatches);
    const matches = allMatches.length * 3;
    const efficiency = totalPoints / matches;
    return Number((efficiency * 100).toFixed(2));
  }

  public static async getAllMatchesHome() {
    const result = await Matches.findAll({
      where: { inProgress: false },
      include: [{
        model: Teams,
        as: 'teamHome',
        attributes: { exclude: ['id'] },
      }],
    });
    return result as unknown as ILeaderBoardHome[];
  }

  public static async leaderBoardHome() {
    const homeTeams = await this.getAllLeaderHome();
    const matches = await this.getAllMatchesHome();
    const name = homeTeams.map((element) => {
      const home = matches.filter((e) => e.teamHome.teamName === element.teamName);
      return {
        name: element.teamName,
        totalPoints: this.getPoints(home),
        totalGames: home.length,
        totalVictories: this.getVictories(home),
        totalDraws: this.getDraw(home),
        totalLosses: this.getLoses(home),
        goalsFavor: this.getGoalsFavor(home),
        goalsOwn: this.getGoalsOnw(home),
        goalsBalance: this.getGoalsBalance(home),
        efficiency: this.getEfficienceTeam(home),
      };
    });
    return name;
  }

  public static async leaderHome() {
    const leader = await this.leaderBoardHome();
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
