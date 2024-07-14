import { Router, Request, Response } from 'express';
import { AppDataSource } from "../../database/data-source";
import { PostController } from '../controllers/post.controller';

const router = Router();

router.get('/posts', new PostController().read);

router.get('/posts/Admin', new PostController().readAdmin);

router.get('/posts/:id', new PostController().readId);

router.post('/posts', new PostController().create);

router.put('/posts/:id', new PostController().update);

router.delete('/posts/:id', new PostController().delete);

router.get('/posts/search/:keyword', new PostController().readAll);

export default router;