import UserModel from "./models/UserModel";
import SqlUserRepository from "./repositories/SqlUserRepository";

const sqlUserRepository = new SqlUserRepository(UserModel);
