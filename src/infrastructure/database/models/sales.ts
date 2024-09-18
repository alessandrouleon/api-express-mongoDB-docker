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
    customerId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Customer',
        required: true,
        trim: true,
    },
    saleItemsId: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'SaleItem',
        required: true,
        trim: true,
    }],
    totalAmount: {
        type: Number,
        required: true,
        trim: true,
    },
    status: {
        type: String,
        enum: ['pending', 'completed', 'cancelled'],
        default: 'pending',
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


export const saleModel = mongoose.model<SaleModel>('Sale', saleSchema);
