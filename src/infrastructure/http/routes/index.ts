import { Router } from "express";
import productRoutes from "./products/product.routes";
import userRoutes from "./users/user.routes";

const routes = Router();

routes.use('/users', userRoutes);
routes.use('/products', productRoutes);

export default routes;