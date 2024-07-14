import Post from "../entities/post.entity";
import IPost from "../interfaces/IPost";
import { AppDataSource } from "../../database/data-source";
import { Repository, FindOneOptions } from 'typeorm';

export const postRepository = AppDataSource.getRepository(Post);

const getPost = (): Promise<IPost[]> => {
    return postRepository.find();
}
export const getPostById = (id: number): Promise<IPost | null> => {
    return postRepository.findOne({ where: { id } });
};

export const createPost = async (post: IPost): Promise<IPost> => {
    const newPost = postRepository.create(post);
    return await postRepository.save(newPost);
};

export const updatePost = async (id: number, updatedData: Partial<IPost>): Promise<IPost | null> => {
    await postRepository.update(id, updatedData);
    const updatedPost = await postRepository.findOne({ where: { id } });
    return updatedPost;
};

export const deletePost = async (id: number): Promise<boolean> => {
    const deleteResult = await postRepository.delete(id);
    return deleteResult.affected !== 0;
};

export default {
    getPost,
    getPostById,
    createPost,
    updatePost,
    deletePost,
};