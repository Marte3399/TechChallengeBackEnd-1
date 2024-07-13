import { Request, Response, Router } from 'express';
import Post from '../entities/post.entity';
import IPost from '../interfaces/IPost';
import { postRepository } from '../repositories/post.repository';
import { AppDataSource } from '../../database/data-source';
import { FindOneOptions } from 'typeorm';


export class PostController {

  async read(req: Request, res: Response) {
    try {
      const postRepository = AppDataSource.getRepository(Post);
      const posts = await postRepository.find();
      res.json(posts);
    } 
    catch (error) {
      console.log(error);
      return res.status(500).json({ message: 'Internal Server Erros' })
    }
  }

  async create(req: Request, res: Response) {
    //criar post
    const {
      title,
      description
    } = req.body
    if (!title) {
      return res.status(400).json({ mensagem: 'The title is mandatory' })
    }
    if (!description) {
      return res.status(400).json({ mensagem: 'The description is mandatory' })
    }

    try {
      const newPost = postRepository.create({
        title,
        description
      })

      await postRepository.save(newPost)

      return res.status(201).json(newPost)
      console.log(newPost)
    } 
    catch (error) {
      console.log(error);
      return res.status(500).json({ message: 'Internal Server Erros' })
    }
  }

  async update(req: Request, res: Response) {
    try {
      const { id } = req.params;
      const postRepository = AppDataSource.getRepository(Post);
      const opcoes: FindOneOptions<Post> = {
        where: { id: Number(id) },
      };
      const post = await postRepository.findOne(opcoes);
      if (!post) {
        return res.status(404).json({ message: 'Post not found' });
      }
      postRepository.merge(post, req.body);
      const resultado = await postRepository.save(post);
      res.json(resultado);
    } 
    catch (error) {
      console.log(error);
      return res.status(500).json({ message: 'Internal Server Erros' })
    }
  }

  async delete(req: Request, res: Response) {
    try {
      const { id } = req.params;
      const postRepository = AppDataSource.getRepository(Post);
      const opcoes: FindOneOptions<Post> = {
        where: { id: Number(id) },
      };
      const post = await postRepository.findOne(opcoes);
      if (!post) {
        return res.status(404).json({ message: 'Post not found' });
      }
      const resultado = await postRepository.remove(post);
      res.json({ message: 'Post successfully removed' });
    }
    catch (error) {
      console.log(error);
      return res.status(500).json({ message: 'Internal Server Erros' })
    }
  }

}
