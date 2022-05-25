import { Request } from 'express';

export interface IUser {
  id: number;
  username: string;
  role: string;
  email: string;
  password:string;
}
export interface ITeam {
  id:number;
  teamName:string;
}
export interface IMatch {
  homeTeam: number;
  awayTeam: number;
  homeTeamGoals: number;
  awayTeamGoals: number;
  inProgress: boolean;
}
export interface ITokenData extends Request{
  payloadUser?:{
    id?: number;
    username?: string;
    role?: string;
  }
}

export interface ILeaderBoardHome {
  id: number;
  homeTeam: number;
  homeTeamGoals: number;
  awayTeam: number;
  awayTeamGoals: number;
  inProgress: boolean;
  teamHome: {
    teamName: string;
  }
}
export interface ILeaderBoardAway {
  id: number;
  homeTeam: number;
  homeTeamGoals: number;
  awayTeam: number;
  awayTeamGoals: number;
  inProgress: boolean;
  teamAway: {
    teamName: string;
  }
}
