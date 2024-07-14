import { Request, Response, Router } from 'express';
import Post from '../entities/post.entity';
import IPost from '../interfaces/IPost';
import { postRepository } from '../repositories/post.repository';
import { AppDataSource } from '../../database/data-source';
import { FindOneOptions, QueryRunner } from 'typeorm';


export class PostController {
  async read(req: Request, res: Response) {
    try {
      const postRepository = AppDataSource.getRepository(Post);
      const posts = await postRepository.find();
      res.json(posts);
    }
    catch (error) {
      console.log(error);
      return res.status(500).json({ message: 'Internal Server Error' })
    }
  }
  async readId(req: Request, res: Response) {
    try {
      const postId = parseInt(req.params.id); // Supondo que o ID está sendo passado como parâmetro na rota

      const postRepository = AppDataSource.getRepository(Post);
      const post = await postRepository.findOne({ where: { id: postId } });

      if (!post) {
        return res.status(404).json({ message: 'Post not found' });
      }

      res.json(post);
    } catch (error) {
      console.log(error);
      return res.status(500).json({ message: 'Internal Server Error' });
    }
  }
  async create(req: Request, res: Response) {
    //criar post
    const {
      title,
      description,
      author
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
        description,
        author
      })

      await postRepository.save(newPost)

      return res.status(201).json(newPost)
      console.log(newPost)
    }
    catch (error) {
      console.log(error);
      return res.status(500).json({ message: 'Internal Server Error' })
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
      return res.status(500).json({ message: 'Internal Server Error' })
    }
  }
  async readAdmin(req: Request, res: Response) {
    try {
      const postRepository = AppDataSource.getRepository(Post);
      const posts = await postRepository.find();
      res.json(posts);
    }
    catch (error) {
      console.log(error);
      return res.status(500).json({ message: 'Internal Server Error' })
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
      return res.status(500).json({ message: 'Internal Server Error' })
    }
  }

  async readAll(req: Request, res: Response) {
    try {
      const keyword = req.params.keyword.toLowerCase()
      const postRepository = AppDataSource.getRepository(Post);
      // Consulta usando createQueryBuilder para buscar por 'title' ou 'description' ou 'author' que contenham a palavra-chave
      const posts = await postRepository
        .createQueryBuilder('post')
        .where('LOWER(post.title) LIKE :keyword OR LOWER(post.description) LIKE :keyword OR LOWER(post.author) LIKE :keyword', { keyword: `%${keyword}%` })
        .getMany();

      res.json(posts);
    } catch (error) {
      console.error(error);
      return res.status(500).json({ message: 'Internal Server Error' });
    }
  }

}
