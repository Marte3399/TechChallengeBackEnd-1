import Post from "../entities/post.entity";
import IPost from "../interfaces/IPost";
import { AppDataSource } from "../../database/data-source";
import { Repository, FindOneOptions } from 'typeorm';

export const postRepository = AppDataSource.getRepository(Post);

const getPost= (): Promise<IPost[]> => {
    return postRepository.find();
}

export default { getPost };