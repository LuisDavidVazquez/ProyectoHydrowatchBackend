import { DataTypes, Model, Sequelize } from "sequelize";
import User from "../../domain/User";
import sequelize_connection from "../../../database/connection";

class UserModel extends Model<User> implements User {
  id!: string;
  email!: string;
  password!: string;
  station_id!: string;
}

UserModel.init(
  {
    id: {
      type: DataTypes.UUID,
      allowNull: false,
      primaryKey: true,
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    station_id: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  },
  {
    tableName: "users",
    timestamps: false,
    sequelize: sequelize_connection,
  }
);

export default UserModel;
