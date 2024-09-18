import { Product } from "../products/product.entity";

export class SaleItem {
    productId: Product;
    quantity: number;
    price: number;
    createdAt?: Date;
    updatedAt?: Date | null;
    deletedAt?: Date | null;

    constructor(props: SaleItem) {
        this.productId = props.productId;
        this.quantity = props.price;
        this.price = props.price;
        this.createdAt = props.createdAt;
        this.updatedAt = props.updatedAt;
        this.deletedAt = props.deletedAt;
    }

}