import { Email } from './email.validator';
import { Password } from './password.validator';

export class User {
    name: string;
    username: string;
    email: string;
    password: string;
    createdAt?: Date;
    updatedAt?: Date | null;
    deletedAt?: Date | null;

    constructor(props: User) {

        this.name = props.name;
        this.username = props.username;
        this.email = new Email(props.email).getValue();
        this.password = new Password(props.password).getValue();
        this.createdAt = props.createdAt;
        this.updatedAt = props.updatedAt;
        this.deletedAt = props.deletedAt;
    }

    static createUser(props: User) {
        const user = { ...props };
        return user;
    }

    static updateUser(props: User) {
        const user: User = { ...props, updatedAt: new Date() };
        return user;
    }

    static deleteUser(props: User) {
        const user: User = { ...props, deletedAt: new Date() };
        return user;
    }

}
