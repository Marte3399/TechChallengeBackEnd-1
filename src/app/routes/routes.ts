import { Router, Request, Response } from 'express';
import { AppDataSource } from "../../database/data-source";
import { PostController } from '../controllers/post.controller';

const router = Router();


router.get('/post', new PostController().read);

router.get('/post/:id', new PostController().readId);

router.post('/post', new PostController().create);

router.put('/post/:id', new PostController().update);

router.delete('/post/:id', new PostController().delete);

router.get('/post/all/:keyword', new PostController().readAll);

export default router;