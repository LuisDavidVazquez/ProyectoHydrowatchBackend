import { DataTypes, Model } from "sequelize";
import Station from "../../domain/Station";
import sequelize_connection from "../../../database/mariaDBConnection";

class StationModel extends Model<Station> implements Station {
  id!: string;
  name!: string;
  description?: string | undefined;
  user_id!: string;
}

StationModel.init(
  {
    id: {
      type: DataTypes.UUID,
      allowNull: false,
      primaryKey: true,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
      defaultValue: "My Station",
    },
    description: {
      type: DataTypes.TEXT,
      allowNull: true,
      defaultValue: "Your first station",
    },
    user_id: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  },
  {
    sequelize: sequelize_connection,
    tableName: "stations",
    timestamps: false,
  }
);

StationModel.sync()

export default StationModel;
