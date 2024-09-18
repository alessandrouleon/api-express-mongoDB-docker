import { Product } from "../../../domain/entities/products/product.entity";
import { IProductRepository } from "../../../domain/repositories/products/product.repository.interface";
import AppError from "../../../shared/errors/app-error";
import { CreateProductDTO } from "../../dtos/products/create-product.dto";

export class CreateProductUseCase {
    constructor(
        private productRepository: IProductRepository
    ) { }

    async execute(productDTO: CreateProductDTO): Promise<Product> {

        const user = Product.createUser(productDTO);

        const [existsName, existsDescription] = await Promise.all([
            this.productRepository.findByName(productDTO.name),
            this.productRepository.findByDescription(productDTO.description)
        ]);

        if (existsName) {
            throw new AppError("Existe Produto cadastrado com este nome.", 400);
        }

        if (existsDescription) {
            throw new AppError("Existe Produto cadastrado com esta descrição.", 400);
        }

        const createProduct = await this.productRepository.create(user);

        return createProduct;
    }
}
