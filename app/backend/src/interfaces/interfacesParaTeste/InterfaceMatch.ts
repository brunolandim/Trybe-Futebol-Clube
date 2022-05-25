export interface Team {
  id?:number;
  teamName:string;
}
export interface Match {
  id?: number;
  homeTeam: number;
  homeTeamGoals: number;
  awayTeam: number;
  awayTeamGoals: number;
  inProgress: boolean;
  teamHome?: Team;
  teamAway?: Team;
}
