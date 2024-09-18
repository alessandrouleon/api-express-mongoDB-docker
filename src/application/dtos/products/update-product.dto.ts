import { CreateProductDTO } from "./create-product.dto";

export interface UpdateProductDTO extends CreateProductDTO {
    id: string;
}