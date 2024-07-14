import 'reflect-metadata';
import express, { Request, Response, NextFunction } from 'express';
import bodyParser from 'body-parser';
import morgan from 'morgan';
import cors from 'cors';
import { PostController } from './controllers/post.controller';
import { AppDataSource } from '../database/data-source';

const app = express();

// Middleware de terceiros
app.use(cors());
app.use(morgan('dev'));
app.use(bodyParser.json());

export async function initializeApp() {
    await AppDataSource.initialize();
    console.log('Data Source has been initialized!');
    const app = express();
    // ...
    return app;
  }

// Roteador de posts
const postController = new PostController();
const postRouter = express.Router();

postRouter.get('/', (req: Request, res: Response) => postController.read(req, res));
postRouter.get('/:id', (req: Request, res: Response) => postController.readId(req, res));
postRouter.post('/', (req: Request, res: Response) => postController.create(req, res));
postRouter.put('/:id', (req: Request, res: Response) => postController.update(req, res));
postRouter.delete('/:id', (req: Request, res: Response) => postController.delete(req, res));

app.use('/post', postRouter);

// Middleware de tratamento de erros
app.use((err: Error, req: Request, res: Response) => {
    console.error(err.stack);
    res.status(500).send({ message: 'Internal Server Error' });
});

export default app;
