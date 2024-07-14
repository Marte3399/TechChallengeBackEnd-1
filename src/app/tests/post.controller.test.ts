import { postRepository } from '../repositories/post.repository';
import supertest from 'supertest';
//import app, { initializeApp } from '../app';
import app, { initializeApp } from '../../server';

beforeAll(async () => {
  await initializeApp();
});

describe('PostController', () => {
  // Run your tests here

  describe('read', () => {
    it('lista de post', async () => {
      const response = await supertest(app).get('/post');
      expect(response.status).toBe(200);
    });
  });

  describe('readId', () => {
    it('buscar um post', async () => {
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
    it('criar novo post', async () => {
      const newPost = 
        postRepository.create({
          title: 'create',
          description: 'Description of Test Post 1',
          author: 'Test Author 1',
        });


      const response = await supertest(app).post(`/post`).send(newPost);

      expect(response.status).toBe(201);
    });
  });

  describe('update', () => {
    it('atualizar post', async () => {
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
    });
  });

  describe('delete', () => {
    it('deletar post', async () => {
      const newPost = await postRepository.save(
        postRepository.create({
          title: 'Test Post 1',
          description: 'Description of Test Post 1',
          author: 'Test Author 1',
        })
      );

      const response = await supertest(app).delete(`/post/${newPost.id}`);
      expect(response.status).toBe(200);
      const deletedPost = await postRepository.findOne({ where: { id: newPost.id } });
      expect(deletedPost).toBeNull();
    });
  });
});