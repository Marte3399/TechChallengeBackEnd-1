import { postRepository } from '../repositories/post.repository';
import supertest from 'supertest';
import app, { finalizedApp, initializeApp } from '../../server';

beforeAll(async () => {
  await initializeApp();
});

afterAll(async () => {
  await finalizedApp();
});
describe('PostController', () => {
  // Run your tests here

  describe('read', () => {
    it('lista de post', async () => {
      const newPost = await postRepository.save(
        postRepository.create({
          title: 'lista de post',
          description: 'Description of Test Post 1',
          author: 'Test Author 1',
        })
      );
      const response = await supertest(app).get('/posts');
      expect(response.status).toBe(200);
    });
  });

  describe('readId', () => {
    it('buscar um post', async () => {
      const newPost = await postRepository.save(
        postRepository.create({
          title: 'buscar um post',
          description: 'Description of Test Post 1',
          author: 'Test Author 1',
        })
      );

      const response = await supertest(app).get(`/posts/${newPost.id}`);

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


      const response = await supertest(app).post(`/posts`).send(newPost);

      expect(response.status).toBe(201);
    });
  });

  describe('update', () => {
    it('atualizar post', async () => {
      const newPost = await postRepository.save(
        postRepository.create({
          title: 'update',
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
      const response = await supertest(app).put(`/posts/${newPost.id}`).send(updatedData);

      expect(response.status).toBe(200);
    });
  });

  describe('delete', () => {
    it('deletar post', async () => {
      const newPost = await postRepository.save(
        postRepository.create({
          title: 'delete',
          description: 'Description of Test Post 1',
          author: 'Test Author 1',
        })
      );

      const response = await supertest(app).delete(`/posts/${newPost.id}`);
      expect(response.status).toBe(200);
      const deletedPost = await postRepository.findOne({ where: { id: newPost.id } });
      expect(deletedPost).toBeNull();
    });
  });
});