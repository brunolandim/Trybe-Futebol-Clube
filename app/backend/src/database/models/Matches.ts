import { DataTypes ,Model } from "sequelize";
import db from '.';
import Teams from './Teams';


export default class Matches extends Model {
    id!:number;
    home_team!: number;
    home_team_goals!: number;
    away_team!: number;
    away_team_goals!: number;
    in_progress!: number;
  }

  Matches.init({
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
    },
    home_team:{ 
      type:DataTypes.STRING,
      references:{
        model:Teams,
        key:'id'
      }
    },
    home_team_goals:DataTypes.INTEGER,
    away_team:{
      type:DataTypes.STRING,
      references:{
        model:Teams,
        key:'id',
      }
    },
    away_team_goals:DataTypes.INTEGER,
    in_progress:DataTypes.BOOLEAN,
  }, {
    underscored:true,
    sequelize:db,
    timestamps:false,
    modelName: 'Matches',
    tableName:'matches',
  });
  Matches.belongsTo(Teams,{foreignKey:'home_team', as:'homeTeam'});
  Matches.belongsTo(Teams,{foreignKey:'away_team', as:'awayTeam'});

  Teams.hasMany(Matches,{foreignKey:'home_team', as:'homeTeam'});
  Teams.hasMany(Matches,{foreignKey:'away_team', as:'awayTeam'});