import homeService from './homeService';
import awayService from './awayService';

export default class LeaderboardService {
  public static percentualEffi = (p: number, g: number) => Number(((p / (g * 3)) * 100).toFixed(2));

  public static async winner() {
    const home = await homeService.leaderBoardHome();
    const away = await awayService.leaderBoardAway();
    const result = home.filter((e, i) => home[i].name)
      .map((element, index) => ({
        name: element.name,
        totalPoints: element.totalPoints + away[index].totalPoints,
        totalGames: element.totalGames + away[index].totalGames,
        totalVictories: element.totalVictories + away[index].totalVictories,
        totalDraws: element.totalDraws + away[index].totalDraws,
        totalLosses: element.totalLosses + away[index].totalLosses,
        goalsFavor: element.goalsFavor + away[index].goalsFavor,
        goalsOwn: element.goalsOwn + away[index].goalsOwn,
        goalsBalance: element.goalsBalance + away[index].goalsBalance,
        efficiency: this.percentualEffi(
          (element.totalPoints + away[index].totalPoints),
          (element.totalGames + away[index].totalGames),
        ) }));
    return result;
  }

  public static async leaderAll() {
    const leader = await this.winner();
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
