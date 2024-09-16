import { CreateUserDTO } from '../../application/dtos/users/create-user.dto';
import { PaginatedData } from '../../shared/utils/pagination';
import { User } from '../entities/users/user.entity';

export interface IUserReturnWithPagination {
    users: User[];
    total: number;
}

export interface IUserRepository {
    create(user: CreateUserDTO): Promise<User>;
    findById(id: string): Promise<User | null>;
    findByUsername(username: string): Promise<User | null>;
    findByEmail(email: string): Promise<User | null>;
    update(id: string, user: Partial<User>): Promise<User | null>;
    delete(id: string): Promise<void>;
    findFilteredUsersWithPagination(
        value: string,
        parametersToPaginate: PaginatedData,
    ): Promise<IUserReturnWithPagination>;
    findAllUsersWithPagination(
        parametersToPaginate: PaginatedData,
    ): Promise<IUserReturnWithPagination>;
}
