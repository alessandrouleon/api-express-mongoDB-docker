import mongoose from 'mongoose';

const saleSchema = new mongoose.Schema({
    user_id: {
        type: mongoose.Schema.Types.ObjectId,  // Referência ao ID do usuário
        ref: 'User',
        required: true,
    },
    total: {
        type: Number,
        required: true,
    },
    sale_date: {
        type: Date,
        default: Date.now,
    },
    updated_at: {
        type: Date,
        default: null,
    },
    deleted_at: {
        type: Date,
        default: null,
    }
});

const Sale = mongoose.model('Sale', saleSchema);
export default Sale;
