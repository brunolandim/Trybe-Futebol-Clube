import { DataTypes, Model } from 'sequelize';
import db from '.';
import Teams from './Teams';

export default class Matches extends Model {
  id!:number;

  homeTeam!: number;

  homeTeamGoals!: number;

  awayTeam!: number;

  awayTeamGoals!: number;

  inProgress!: boolean;
}

Matches.init({
  id: {
    type: DataTypes.INTEGER,
    allowNull: false,
    primaryKey: true,
    autoIncrement: true,
  },
  homeTeam: {
    type: DataTypes.STRING,
    references: {
      model: Teams,
      key: 'id',
    },
  },
  homeTeamGoals: DataTypes.INTEGER,
  awayTeam: {
    type: DataTypes.STRING,
    references: {
      model: Teams,
      key: 'id',
    },
  },
  awayTeamGoals: DataTypes.INTEGER,
  inProgress: DataTypes.BOOLEAN,
}, {
  underscored: true,
  sequelize: db,
  timestamps: false,
  modelName: 'Matches',
  tableName: 'matches',
});
Matches.belongsTo(Teams, { foreignKey: 'homeTeam', as: 'teamHome' });
Matches.belongsTo(Teams, { foreignKey: 'awayTeam', as: 'teamAway' });

Teams.hasMany(Matches, { foreignKey: 'homeTeam', as: 'teamHome' });
Teams.hasMany(Matches, { foreignKey: 'awayTeam', as: 'teamAway' });
