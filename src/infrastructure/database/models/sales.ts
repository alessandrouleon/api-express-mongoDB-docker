import mongoose, { Schema } from 'mongoose';
import { Sale } from '../../../domain/entities/sales/sale.entity';

interface SaleModel extends Sale, Document { }

const saleSchema = new Schema<SaleModel>({
    userId: {
        type: mongoose.Schema.Types.ObjectId,  // Referência ao ID do usuário
        ref: 'User',
        required: true,
        trim: true,
    },
    total: {
        type: Number,
        required: true,
        trim: true,
    },
    saleDate: {
        type: Date,
        default: Date.now,
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


export const SaleModel = mongoose.model<SaleModel>('Sale', saleSchema);
