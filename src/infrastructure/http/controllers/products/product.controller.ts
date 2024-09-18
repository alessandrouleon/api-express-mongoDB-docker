import { Request, Response } from 'express';
import { CreateProductDTO } from '../../../../application/dtos/products/create-product.dto';
import { CreateProductUseCase } from '../../../../application/use-cases/products/create-product.use-case';

export class ProductController {
    constructor(
        private readonly createProductUseCase: CreateProductUseCase,
        // private readonly getUserUseCase: GetUserUseCase,
        // private readonly updateUserUseCase: UpdateUserUseCase,
        // private readonly deleteUserUseCase: DeleteUserUseCase
    ) { }

    async createProduct(request: Request, response: Response) {
        try {
            const productDTO = request.body as CreateProductDTO;

            // UserValidator.validateCreateUser(userDTO);

            const user = await this.createProductUseCase.execute(productDTO);

            return response.status(201).json(user);
        } catch (error: any) {
            return response
                .status(error.statusCode || 400)
                .json({ error: error.message });
        }
    }

    // public async updateUser(request: Request, response: Response): Promise<Response> {
    //     try {
    //         const userId = request.params.id;
    //         const upateUserDTO = request.body as UpdateUserDTO;

    //         UserValidator.validateUpdateUser(upateUserDTO);

    //         const updateUser = await this.updateUserUseCase.execute(userId, { ...upateUserDTO });

    //         return response.status(201).json(updateUser);
    //     } catch (error: any) {
    //         return response
    //             .status(error.statusCode || 400)
    //             .json({ error: error.message });
    //     }
    // }

    // public async deleteUser(request: Request, response: Response): Promise<Response> {
    //     try {
    //         const userId = request.params.id;

    //         const deleteUser = await this.deleteUserUseCase.execute(userId);

    //         return response.status(201).json(deleteUser);
    //     } catch (error: any) {
    //         return response
    //             .status(error.statusCode || 400)
    //             .json({ error: error.message });
    //     }
    // }


    // async findAllUsers(request: Request, response: Response) {
    //     try {
    //         const page = parseInt(request.params.page, 10) || 1; // Pega o parâmetro de página ou define como 1

    //         const value = (request.query.value as string) ?? '';

    //         const users = await this.getUserUseCase.getUsers(value, page);

    //         return response.status(200).json(users);
    //     } catch (error: any) {
    //         return response.status(500).json({ error: error.message });
    //     }
    // }
}
