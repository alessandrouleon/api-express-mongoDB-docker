import { Product } from "../../../domain/entities/products/product.entity";

export interface PaginatedProductDTO {
    users: Product[];
    total: number;
    currentPage: number;
    nextPage: number;
    prevPage: number;
    lastPage: number;
}
