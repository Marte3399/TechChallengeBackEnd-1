import 'reflect-metadata';
import express from 'express';
import cors from 'cors';
import { AppDataSource } from './database/data-source';
import routers from './app/routes/routes';
import swaggerUi from "swagger-ui-express";
import swaggerOutput from "./app/config/swagger_output.json";
import bodyParser from 'body-parser'

const app = express();

app.use(cors());

app.use(express.json());

app.use(routers);
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerOutput));
app.use(bodyParser.json());
AppDataSource.initialize().then(async () => {
    console.log('Database OK');
    app.listen(4000, () => {
        console.log('Server started on port 4000');
    })
})
export default app;