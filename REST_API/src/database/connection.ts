import { Sequelize } from "sequelize";
import dotenv from "dotenv";

dotenv.config();

const DATABASE = process.env["SQL_DATABASE_NAME"] ?? "test";
const USERNAME = process.env["SQL_DATABASE_USERNAME"] ?? "root";
const PASSWORD = process.env["SQL_DATABASE_PASSWORD"] ?? "";
const HOST = process.env["SQL_DATABASE_HOST"] ?? "localhost";
const PORT = parseInt(process.env["SQL_DATABASE_PORT"] ?? "3306");

const sequelize_connection = new Sequelize(DATABASE, USERNAME, PASSWORD, {
  dialect: "mariadb",
  host: HOST,
  port: PORT,
  logging: false
});


export default sequelize_connection