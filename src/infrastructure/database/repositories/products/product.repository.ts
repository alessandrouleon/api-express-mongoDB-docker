import mongoose from 'mongoose';
import { CreateProductDTO } from '../../../../application/dtos/products/create-product.dto';
import { Product } from '../../../../domain/entities/products/product.entity';
import { IProductRepository, IProductReturnWithPagination } from '../../../../domain/repositories/products/product.repository.interface';
import { PaginatedData } from '../../../../shared/utils/pagination';
import { productModel } from '../../models/product';


export class ProductRepository implements IProductRepository {

    public async create(product: CreateProductDTO): Promise<Product> {
        return new productModel(product).save();
    }

    public async update(id: string, product: Partial<Product>): Promise<Product | null> {
        return productModel.findByIdAndUpdate(id, product, { new: true }).exec();
    }

    public async delete(id: string, product: Product): Promise<void> {
        await productModel.findByIdAndUpdate(id, { deletedAt: product.deletedAt }, { new: true }).exec();
    }

    public async findById(id: string): Promise<Product | null> {
        // Verifica se o ID é um ObjectId válido, particular do mongose
        if (!mongoose.Types.ObjectId.isValid(id)) {
            throw new Error('ID inválido. Deve ter 24 caracteres no formato hexadecimal.');
        }
        const productId = await productModel.findById(id).exec();
        return productId;
    }

    public async findByName(name: string): Promise<Product | null> {
        return productModel.findOne({ name }).exec();
    }

    public async findByDescription(description: string): Promise<Product | null> {
        return productModel.findOne({ description }).exec();
    }

    public async findFilteredProductsWithPagination(value: string,
        { take, page }: PaginatedData): Promise<IProductReturnWithPagination> {
        const query = {
            $or: [
                { name: { $regex: value, $options: 'i' } },
                { description: { $regex: value, $options: 'i' } },
                { price: { $regex: value, $options: 'i' } },
                { stock: { $regex: value, $options: 'i' } },
            ],
            deletedAt: { $eq: null }
        };

        const [data, total] = await Promise.all([
            productModel.find(query)
                .limit(take)
                .skip((page - 1) * take)
                .sort({ createdAt: -1 })
                .select('id name description price stock createdAt updatedAt deletedAt'),
            productModel.countDocuments(query),
        ]);

        return { products: data, total };
    }

    public async findAllProductsWithPagination({ page, take }: PaginatedData): Promise<IProductReturnWithPagination> {
        const query = { deletedAt: { $eq: null } };

        const [data, total] = await Promise.all([
            productModel.find(query)
                .limit(take)
                .skip((page - 1) * take)
                .sort({ createdAt: -1 })
                .select('id name description price stock createdAt updatedAt deletedAt'),
            productModel.countDocuments(query),
        ]);

        return { products: data, total };
    }

}
