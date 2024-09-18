export class Product {
    name: string;
    description: string;
    price: number;
    stock: number;
    createdAt?: Date;
    updatedAt?: Date | null;
    deletedAt?: Date | null;

    constructor(props: Product) {
        this.name = props.name;
        this.description = props.description;
        this.price = props.price;
        this.stock = props.stock;
        this.createdAt = props.createdAt;
        this.updatedAt = props.updatedAt;
        this.deletedAt = props.deletedAt;
    }

    static createUser(props: Product) {
        const user = { ...props };
        return user;
    }

    static updateUser(props: Product) {
        const user: Product = { ...props, updatedAt: new Date() };
        return user;
    }

    static deleteUser(props: Product) {
        const user: Product = { ...props, deletedAt: new Date() };
        return user;
    }
}