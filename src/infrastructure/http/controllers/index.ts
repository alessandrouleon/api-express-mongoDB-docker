import { CreateUserUseCase } from "../../../application/use-cases/users/create-user.use-case";
import { DeleteUserUseCase } from "../../../application/use-cases/users/delete-user.use-case";
import { GetUserUseCase } from "../../../application/use-cases/users/get-user.use-case";
import { UpdateUserUseCase } from "../../../application/use-cases/users/update-user.use-case";
import { EncryptPassword } from "../../crypto/encrypt-password";
import { UserRepository } from "../../database/repositories/users/user.repository";
import { UserController } from "./user.controller";


const userRepository = new UserRepository();
const cryptoPassword = new EncryptPassword();
const createUserUseCase = new CreateUserUseCase(userRepository, cryptoPassword);
const updateUserUseCase = new UpdateUserUseCase(userRepository, cryptoPassword);
const deleteUserUseCase = new DeleteUserUseCase(userRepository);
const getUserUseCase = new GetUserUseCase(userRepository);

const createUserController = new UserController(
    createUserUseCase,
    getUserUseCase,
    updateUserUseCase,
    deleteUserUseCase
);

export { createUserController };
