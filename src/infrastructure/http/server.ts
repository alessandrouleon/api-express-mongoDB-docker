import cors from 'cors';
import dotenv from 'dotenv';
import express from 'express';
import { MongoConnection } from '../database/mongoose-connection';
import routes from './routes';


dotenv.config();

const app = express();
const PORT = process.env.PORT || 4050;

app.use(express.json());
app.use(cors())
app.use(routes);

const startServer = async () => {
    try {
        await MongoConnection();
        app.listen(PORT, () => {
            console.log(`Server running on port ${PORT}`);
        });
    } catch (error) {
        console.error("Erro ao conectar ao MongoDB:", error);
        process.exit(1); // Encerrar o processo caso a conexão falhe
    }
}

startServer();
