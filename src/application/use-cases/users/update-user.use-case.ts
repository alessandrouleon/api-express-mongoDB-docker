import { Email } from "../../../domain/entities/users/email.validator";
import { Password } from "../../../domain/entities/users/password.validator";
import { User } from "../../../domain/entities/users/user.entity";
import { IUserRepository } from "../../../domain/repositories/user.repository.interface";
import { ICryptoPassword } from "../../../infrastructure/crypto/crypto-password.interface";
import AppError from "../../../shared/errors/app-error";
import { UpdateUserDTO } from "../../dtos/users/update-user.dto";

export class UpdateUserUseCase {
    constructor(
        private userRepository: IUserRepository,
        private cryptoPassword: ICryptoPassword
    ) { }

    async execute(id: string, userUpdate: UpdateUserDTO): Promise<User | null> {
        const userId = await this.userRepository.findById(id);

        if (!userId) {
            throw new AppError('Id não existe', 400);
        }

        if (userUpdate.username && userId.username !== userUpdate.username) {
            const getUsername = await this.userRepository.findByUsername(userUpdate.username);
            if (getUsername) {
                throw new AppError('Nome de usuário já cadastrado', 400);
            }
        }

        if (userUpdate.email && userId.email !== userUpdate.email) {
            const getEmail = await this.userRepository.findByEmail(userUpdate.email);
            if (getEmail) {
                throw new AppError('Email já cadastrado', 400);
            }
        }

        const updatedData: User = {
            name: userUpdate.name || userId.name,
            username: userUpdate.username || userId.username,
            email: userUpdate.email ? new Email(userUpdate.email).getValue() : userId.email,
            password: userUpdate.password ? await this.cryptoPassword.hashPassword(new Password(userUpdate.password).getValue()) : userId.password,
        };

        const user = User.updateUser(updatedData);
        const updateUser = await this.userRepository.update(id, user);
        return updateUser;

    }
}
