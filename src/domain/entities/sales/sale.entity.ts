import { Customer } from "../customers/customer.entity";
import { SaleItem } from "../sale-item/sale-item.entity";
import { User } from "../users/user.entity";

export class Sale {
    userId: User;
    customerId: Customer;
    saleItemsId: SaleItem;
    totalAmount: number;
    status: string;
    saleDate: Date;
    createdAt?: Date;
    updatedAt?: Date | null;
    deletedAt?: Date | null;

    constructor(props: Sale) {
        this.userId = props.userId;
        this.customerId = props.customerId;
        this.saleItemsId = props.saleItemsId;
        this.totalAmount = props.totalAmount;
        this.status = props.status;
        this.saleDate = props.saleDate;
        this.createdAt = props.createdAt;
        this.updatedAt = props.updatedAt;
        this.deletedAt = props.deletedAt;
    }
}