import { GetUserUseCase } from "../../../application/use-cases/users/get-user.use-case";
import { EncryptPassword } from "../../crypto/encrypt-password";
import { UserRepository } from "../../database/repositories/user.repository";
import { UserController } from "./user.controller";

const userRepository = new UserRepository();
const cryptoPassword = new EncryptPassword();
const getUserUseCase = new GetUserUseCase(userRepository);

const createUserController = new UserController(userRepository, cryptoPassword, getUserUseCase);

export { createUserController };
