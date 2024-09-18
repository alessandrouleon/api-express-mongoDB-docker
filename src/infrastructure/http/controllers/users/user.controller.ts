import { Request, Response } from 'express';
import { CreateUserDTO } from '../../../../application/dtos/users/create-user.dto';
import { UpdateUserDTO } from '../../../../application/dtos/users/update-user.dto';
import { CreateUserUseCase } from '../../../../application/use-cases/users/create-user.use-case';
import { DeleteUserUseCase } from '../../../../application/use-cases/users/delete-user.use-case';
import { GetUserUseCase } from '../../../../application/use-cases/users/get-user.use-case';
import { UpdateUserUseCase } from '../../../../application/use-cases/users/update-user.use-case';
import { UserValidator } from '../../../../shared/validation/user-validate-fields';

export class UserController {
    constructor(
        private readonly createUserUseCase: CreateUserUseCase,
        private readonly getUserUseCase: GetUserUseCase,
        private readonly updateUserUseCase: UpdateUserUseCase,
        private readonly deleteUserUseCase: DeleteUserUseCase
    ) { }

    async createUser(request: Request, response: Response) {
        try {
            const userDTO = request.body as CreateUserDTO;

            UserValidator.validateCreateUser(userDTO);

            const user = await this.createUserUseCase.execute(userDTO);

            return response.status(201).json(user);
        } catch (error: any) {
            return response
                .status(error.statusCode || 400)
                .json({ error: error.message });
        }
    }

    public async updateUser(request: Request, response: Response): Promise<Response> {
        try {
            const userId = request.params.id;
            const upateUserDTO = request.body as UpdateUserDTO;

            UserValidator.validateUpdateUser(upateUserDTO);

            const updateUser = await this.updateUserUseCase.execute(userId, { ...upateUserDTO });

            return response.status(201).json(updateUser);
        } catch (error: any) {
            return response
                .status(error.statusCode || 400)
                .json({ error: error.message });
        }
    }

    public async deleteUser(request: Request, response: Response): Promise<Response> {
        try {
            const userId = request.params.id;

            const deleteUser = await this.deleteUserUseCase.execute(userId);

            return response.status(201).json(deleteUser);
        } catch (error: any) {
            return response
                .status(error.statusCode || 400)
                .json({ error: error.message });
        }
    }


    async findAllUsers(request: Request, response: Response) {
        try {
            const page = parseInt(request.params.page, 10) || 1; // Pega o parâmetro de página ou define como 1

            const value = (request.query.value as string) ?? '';

            const users = await this.getUserUseCase.getUsers(value, page);

            return response.status(200).json(users);
        } catch (error: any) {
            return response.status(500).json({ error: error.message });
        }
    }
}
