import { User } from "../../../domain/entities/users/user.entity";
import { IUserRepository } from "../../../domain/repositories/users/user.repository.interface";
import AppError from "../../../shared/errors/app-error";

export class DeleteUserUseCase {
    constructor(private userRepository: IUserRepository) { }

    async execute(id: string): Promise<void> {

        const existsUser = await this.userRepository.findById(id);

        if (!existsUser) {
            throw new AppError('Id não existe', 400);
        }

        const deleteUser = User.deleteUser(existsUser);

        await this.userRepository.delete(id, { ...deleteUser });

    }
}
