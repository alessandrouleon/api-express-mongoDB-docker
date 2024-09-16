import { Email } from './email.validator';
import { Password } from './password.validator';

type ICreateUser = {
    name: string;
    username: string;
    email: string;
    password: string;
}

export class User {
    name: string;
    username: string;
    email: string;
    password: string;
    createdAt: Date;
    updatedAt?: Date | null;
    deletedAt?: Date | null;

    constructor(props: ICreateUser) {
        this.name = props.name;
        this.username = props.username;
        this.email = new Email(props.email).getValue();
        this.password = new Password(props.password).getValue();
        this.createdAt = new Date();
    }

    static create(props: ICreateUser) {
        const user = new User(props);
        return user;
    }
}
