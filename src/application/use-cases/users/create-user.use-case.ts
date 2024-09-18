import { User } from '../../../domain/entities/users/user.entity';
import { IUserRepository } from '../../../domain/repositories/users/user.repository.interface';
import { ICryptoPassword } from '../../../infrastructure/crypto/crypto-password.interface';
import AppError from '../../../shared/errors/app-error';
import { CreateUserDTO } from '../../dtos/users/create-user.dto';

export class CreateUserUseCase {
    constructor(
        private userRepository: IUserRepository,
        private cryptoPassword: ICryptoPassword
    ) { }

    async execute(userDTO: CreateUserDTO): Promise<User> {

        const user = User.createUser(userDTO);

        const [existsUsername, existsEmail] = await Promise.all([
            this.userRepository.findByUsername(userDTO.username),
            this.userRepository.findByEmail(userDTO.email)
        ]);

        if (existsUsername) {
            throw new AppError("Existe usuário cadastrado com este nome.", 400);
        }

        if (existsEmail) {
            throw new AppError("Existe usuário cadastrado com este email.", 400);
        }

        const hashPassword = await this.cryptoPassword.hashPassword(userDTO.password);
        user.password = hashPassword;

        const createUser = await this.userRepository.create(user);

        return createUser;
    }
}
