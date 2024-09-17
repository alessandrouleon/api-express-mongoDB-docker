import mongoose from 'mongoose';

const saleItemSchema = new mongoose.Schema({
    sale_id: {
        type: mongoose.Types.ObjectId,
        ref: 'Sale',
        required: true
    },
    product_id: {
        type: mongoose.Types.ObjectId,
        ref: 'Product',
        required: true
    },
    quantity: {
        type: Number,
        required: true
    },
    price: {
        type: mongoose.Types.Decimal128,
        required: true
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

const SaleItem = mongoose.model('SaleItem', saleItemSchema);
export default SaleItem;
