import mongoose, { Document, Schema } from 'mongoose';
import { User } from '../../../domain/entities/users/user.entity';

interface UserModel extends User, Document { }

const UserSchema = new Schema<UserModel>({
    name: {
        type: String,
        required: true,
        trim: true,
    },
    username: {
        type: String,
        required: true,
        unique: true,
        trim: true,
    },
    email: {
        type: String,
        required: true,
        unique: true,
        trim: true,
    },
    password: {
        type: String,
        required: true,
    },
    createdAt: {
        type: Date,
        default: Date.now,
    },
    updatedAt: {
        type: Date,
        default: null,
    },
    deletedAt: {
        type: Date,
        default: null,
    }
});

export const UserModel = mongoose.model<UserModel>('User', UserSchema);
