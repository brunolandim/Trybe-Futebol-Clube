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
