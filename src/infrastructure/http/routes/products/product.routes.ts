import { Router } from 'express';
import { createProductController } from '../../controllers/products';

const productRoutes = Router();

productRoutes.post('/', async (request, response) => {
    await createProductController.createProduct(request, response)
});

// userRoutes.patch("/update/:id", async (request, response) => {
//     await createProductController.updateUser(request, response)
// });

// userRoutes.delete("/delete/:id", async (request, response) => {
//     await createProductController.deleteUser(request, response)
// });

// userRoutes.get("/search/:page", async (request, response) => {
//     await createProductController.findAllUsers(request, response)
// });


export default productRoutes;



