import { CreateProductDTO } from '../../../application/dtos/products/create-product.dto';
import { PaginatedData } from '../../../shared/utils/pagination';
import { Product } from '../../entities/products/product.entity';

export interface IProductReturnWithPagination {
    products: Product[];
    total: number;
}

export interface IProductRepository {
    create(product: CreateProductDTO): Promise<Product>;
    findById(id: string): Promise<Product | null>;
    findByName(name: string): Promise<Product | null>;
    findByDescription(description: string): Promise<Product | null>;
    update(id: string, product: Partial<Product>): Promise<Product | null>;
    delete(id: string, product: Product): Promise<void>;
    findFilteredProductsWithPagination(
        value: string,
        parametersToPaginate: PaginatedData,
    ): Promise<IProductReturnWithPagination>;
    findAllProductsWithPagination(
        parametersToPaginate: PaginatedData,
    ): Promise<IProductReturnWithPagination>;
}
