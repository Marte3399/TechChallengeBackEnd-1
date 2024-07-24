import { Router, Request, Response } from 'express';
import { AppDataSource } from "../../database/data-source";
import { PostController } from '../controllers/post.controller';
import { UserController } from '../controllers/user.controller';
import { UserRepository } from '../repositories/user.repository';
import { authMiddleware } from '../middleware/auth';

const router = Router();

router.get('/login', new UserController(new UserRepository()).login);
router.get('/teste', authMiddleware,new UserController(new UserRepository()).teste);

router.get('/posts/search', new PostController().readAll);

router.get('/posts', new PostController().read);

router.get('/posts/Admin', new PostController().readAdmin);

router.get('/posts/:id', new PostController().readId);

router.post('/posts', new PostController().create);

router.put('/posts/:id', new PostController().update);

router.delete('/posts/:id', new PostController().delete);



export default router;