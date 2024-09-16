import mongoose from 'mongoose';
import { CreateUserDTO } from '../../../application/dtos/users/create-user.dto';
import { User } from '../../../domain/entities/users/user.entity';
import { IUserRepository, IUserReturnWithPagination } from '../../../domain/repositories/user.repository.interface';
import { PaginatedData } from '../../../shared/utils/pagination';
import { UserModel } from '../models/user.model';

export class UserRepository implements IUserRepository {
    //ok
    public async create(user: CreateUserDTO): Promise<User> {
        return new UserModel(user).save();
    }

    public async update(id: string, user: Partial<User>): Promise<User | null> {
        return UserModel.findByIdAndUpdate(id, user, { new: true }).exec();
    }

    public async delete(id: string): Promise<void> {
        await UserModel.findByIdAndUpdate(id, { deletedAt: new Date() }).exec();
    }
    //ok
    public async findById(id: string): Promise<User | null> {
        // Verifica se o ID é um ObjectId válido, particular do mongose
        if (!mongoose.Types.ObjectId.isValid(id)) {
            throw new Error('ID inválido. Deve ter 24 caracteres no formato hexadecimal.');
        }
        const userId = await UserModel.findById(id).exec();
        return userId;
    }
    //ok
    public async findByUsername(username: string): Promise<User | null> {
        return UserModel.findOne({ username }).exec();
    }
    //ok
    public async findByEmail(email: string): Promise<User | null> {
        return UserModel.findOne({ email }).exec();
    }
    //ok
    public async findFilteredUsersWithPagination(value: string,
        { take, page }: PaginatedData): Promise<IUserReturnWithPagination> {
        const query = {
            $or: [
                { name: { $regex: value, $options: 'i' } },
                { username: { $regex: value, $options: 'i' } },
                { email: { $regex: value, $options: 'i' } },
            ],
            deletedAt: { $eq: null }
        };

        const [data, total] = await Promise.all([
            UserModel.find(query)
                .limit(take)
                .skip((page - 1) * take)
                .sort({ createdAt: -1 })
                .select('id name username email password createdAt updatedAt deletedAt'),
            UserModel.countDocuments(query),
        ]);

        return { users: data, total };
    }
    //ok
    public async findAllUsersWithPagination({ page, take }: PaginatedData): Promise<IUserReturnWithPagination> {
        const query = { deletedAt: { $eq: null } };

        const [data, total] = await Promise.all([
            UserModel.find(query)
                .limit(take)
                .skip((page - 1) * take)
                .sort({ createdAt: -1 })
                .select('id name username email password createdAt updatedAt deletedAt'),
            UserModel.countDocuments(query),
        ]);

        return { users: data, total };
    }


}
