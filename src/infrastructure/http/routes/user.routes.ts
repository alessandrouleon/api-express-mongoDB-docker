import { Router } from 'express';
import { createUserController } from '../controllers';

const userRoutes = Router();

userRoutes.post('/', async (request, response) => {
    await createUserController.createUser(request, response)
});

userRoutes.patch("/update/:id", async (request, response) => {
    await createUserController.updateUser(request, response)
});

userRoutes.get("/search/:page", async (request, response) => {
    await createUserController.findAllUsers(request, response)
});


export default userRoutes;



