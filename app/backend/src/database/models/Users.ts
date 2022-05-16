import {DataTypes, Model} from 'sequelize';
import db from '.'

export default class Users extends Model {
    id!: number;
    username!: string;
    role!: string;
    email!: string;
    password!:string;
  }
  Users.init({
    id: {  
      type:DataTypes.INTEGER,
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
    },
    username: DataTypes.STRING,
    role: DataTypes.STRING,
    email: {
      type:DataTypes.STRING,
      unique:true,
    },
    password: DataTypes.STRING
  }, {
    underscored:true,
    sequelize:db,
    timestamps:false,
    modelName: 'Users',
    tableName:'users'
  });
