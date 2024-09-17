import { User } from "../users/user.entity";

export class Sale {
    userId: User;
    total: number;
    saleDate: Date;
    createdAt?: Date;
    updatedAt?: Date | null;
    deletedAt?: Date | null;

    constructor(props: Sale) {
        this.userId = props.userId;
        this.total = props.total;
        this.saleDate = props.saleDate;
        this.createdAt = props.createdAt;
        this.updatedAt = props.updatedAt;
        this.deletedAt = props.deletedAt;
    }
}