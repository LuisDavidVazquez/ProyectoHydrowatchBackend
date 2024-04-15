import { DataTypes, Model, NOW } from "sequelize";
import Plant from "../../domain/Plant";
import sequelize_connection from "../../../database/connection";

class PlantModel extends Model<Plant> implements Plant {
  id!: string;
  name!: string;
  amount!: number;
  seed_time!: number;
  station_id!: string;
}

PlantModel.init(
  {
    id: {
      type: DataTypes.UUID,
      allowNull: false,
      primaryKey: true,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    amount: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: 0,
    },
    seed_time: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: NOW,
    },
    station_id: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  },
  { tableName: "plants", timestamps: false, sequelize: sequelize_connection }
);

export default PlantModel;
