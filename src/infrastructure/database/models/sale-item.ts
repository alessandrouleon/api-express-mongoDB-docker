import mongoose, { Schema } from 'mongoose';
import { SaleItem } from '../../../domain/entities/sale-item/sale-item.entity';

interface SaleItemModel extends SaleItem, Document { }

const saleItemSchema = new Schema<SaleItemModel>({
    productId: {
        type: mongoose.Types.ObjectId,
        ref: 'Product',
        required: true,
        trim: true,
    },
    quantity: {
        type: Number,
        required: true,
        trim: true,
    },
    price: {
        type: Number,
        required: true,
        trim: true,
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

export const saleItemModel = mongoose.model<SaleItemModel>('SaleItem', saleItemSchema);

