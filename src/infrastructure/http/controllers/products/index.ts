import { CreateProductUseCase } from "../../../../application/use-cases/products/create-product.use-case";
import { ProductRepository } from "../../../database/repositories/products/product.repository";
import { ProductController } from "./product.controller";

const productRepository = new ProductRepository();

const createProductUseCase = new CreateProductUseCase(productRepository);

const createProductController = new ProductController(
    createProductUseCase,
);

export { createProductController };
