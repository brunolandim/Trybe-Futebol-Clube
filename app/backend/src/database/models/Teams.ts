import {DataTypes,Model} from 'sequelize';
import db from '.'

export default class Teams extends Model {
  id!:number;
  team_name:string;
  }

  Teams.init({
    id:{
      type:DataTypes.INTEGER,
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
    },
    team_name: DataTypes.STRING
  }, {
    underscored:true,
    sequelize:db,
    timestamps:false,
    modelName: 'Teams',
    tableName:'teams',
  });
