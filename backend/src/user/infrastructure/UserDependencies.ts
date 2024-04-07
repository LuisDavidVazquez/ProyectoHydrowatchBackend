import { CreateUserUseCase } from "../application/CreateUserUseCase";
import { GetUserByIdUseCase } from "../application/GetUserByIdUseCase";
import { LogInUserUseCase } from "../application/LogInUserUseCase";
import { CreateUserController } from "./controllers/CreateUserController";
import { GetUserByIdController } from "./controllers/GetUserByIdController";
import { LogInUserController } from "./controllers/LogInUserController";
import { EncryptHelper } from "./helpers/EncryptHelper";
import { TokenHelper } from "./helpers/TokenHelper";
import { MongodbRepository } from "./repositories/MongodbRepository";

const mongodbRepository = new MongodbRepository ()
const encryptHelper = new EncryptHelper();
const tokenHelper = new TokenHelper();

//Create User
const createUserUseCase = new CreateUserUseCase (
    mongodbRepository,
    encryptHelper
)
export const createUserController = new CreateUserController (
    createUserUseCase
)

//Get User by id
const getUserByIdUseCase = new GetUserByIdUseCase (
    mongodbRepository
)
export const getUserByIdController = new GetUserByIdController(
    getUserByIdUseCase
)

//Log In User by Email and password
const logInUserUseCase = new LogInUserUseCase (
    mongodbRepository,
    encryptHelper,
    tokenHelper
)
export const logInUserController = new LogInUserController (
    logInUserUseCase
)