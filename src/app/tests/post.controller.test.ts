//import { PostController } from './post.controller';
import { AppDataSource } from '../../database/data-source';
import { Post } from '../entities/post.entity';
import { postRepository } from '../repositories/post.repository';
import supertest from 'supertest';
import { Express } from 'express';
import { PostController } from '../controllers/post.controller';

describe('PostController', () => {
  let app: Express;
  let postController: PostController;

  afterEach(async () => {
    await AppDataSource.destroy();
  });

  describe('read', () => {
    it('should return all posts', async () => {

        const newPost = await postRepository.save(
            postRepository.create({
              title: 'Test Post 1',
              description: 'Description of Test Post 1',
              author: 'Test Author 1',
            })
          );

      const response = await supertest(app).get('/post');

      expect(response.status).toBe(200);
      expect(response.body).toEqual(newPost);
    });
  });

  describe('readId', () => {
    it('should return a post by id', async () => {
        const newPost = await postRepository.save(
            postRepository.create({
              title: 'Test Post 1',
              description: 'Description of Test Post 1',
              author: 'Test Author 1',
            })
          );

      const response = await supertest(app).get(`/post/${newPost.id}`);

      expect(response.status).toBe(200);
      expect(response.body).toEqual(newPost);
    });
  });

  describe('create', () => {
    it('should create a new post', async () => {
        const newPost = await postRepository.save(
            postRepository.create({
              title: 'Test Post 2',
              description: 'Description of Test Post 2',
              author: 'Test Author 2',
            })
          );

      const response = await supertest(app)
       .post('/post')
       .send(newPost);

      expect(response.status).toBe(201);
      expect(response.body).toEqual(newPost);
    });
  });

  describe('update', () => {
    it('should return a post by id', async () => {
        const newPost = await postRepository.save(
            postRepository.create({
              title: 'Test Post 1',
              description: 'Description of Test Post 1',
              author: 'Test Author 1',
            })
          );
    // Dados para atualização
        const updatedData = {
            title: 'Updated Test Post 3',
            description: 'Updated Description of Test Post 3',
            author: 'Updated Test Author 3',
            };
      const response = await supertest(app).put(`/post/${newPost.id}`).send(updatedData);

      expect(response.status).toBe(200);
      expect(response.body).toEqual(newPost);
    });
  });
  
  describe('delete', () => {
    it('should return a post by id', async () => {
        const newPost = await postRepository.save(
            postRepository.create({
              title: 'Test Post 1',
              description: 'Description of Test Post 1',
              author: 'Test Author 1',
            })
          );

      const response = await supertest(app).delete(`/post/${newPost.id}`);

      expect(response.status).toBe(200);
      expect(response.body).toEqual(newPost);
      const deletedPost = await postRepository.findOne({ where: { id: newPost.id } });
      expect(deletedPost).toBeNull();
    });
  });
});