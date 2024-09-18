export class Customer {
    name: string;
    email: string;
    phone: string;
    address: string;
    createdAt?: Date;
    updatedAt?: Date | null;
    deletedAt?: Date | null;

    constructor(props: Customer) {
        this.name = props.name;
        this.email = props.email;
        this.phone = props.phone;
        this.address = props.address;
        this.createdAt = props.createdAt;
        this.updatedAt = props.updatedAt;
        this.deletedAt = props.deletedAt;
    }
}