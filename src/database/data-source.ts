import "reflect-metadata"
import { DataSource } from "typeorm"
import {CreatePostTable1720664501470} from './migrations/1720664501470-CreatePostTable';
import Post from "../app/entities/post.entity";


//export const AppDataSource = new DataSource({
//    type: "mysql",
//    host: "localhost",
//    port: 3306,
//    username: "root",
//    password: "123@mudar",
//    database: "project_post",
//    synchronize: true,
//    logging: false,
//    entities: [Post ],
//    migrations: [CreatePostTable1720664501470],
//    subscribers: [],
//})

//export const AppDataSource = new DataSource({
//    type: "postgres",
//    host: "localhost",
//    port: 5432,
//    username: "postgres",
//    password: "postgres",
//    database: "postgres",
//    synchronize: true,
//    logging: false,
//    entities: [Post],
//    migrations: [CreatePostTable1720664501470],
//    subscribers: [],
//})

//export const AppDataSource = new DataSource({
//    type: "mongodb",
//    host: "localhost",
//    port: 3010,
//    username: "marterm35",
//    password: "UnlmwQiuMsE9WPha",
//    database: "tech-post",
//    synchronize: true,
//    logging: false,
//    entities: [Post],
//    migrations: [CreatePostTable1720664501470],
//    subscribers: [],
//})


export const AppDataSource = new DataSource({
    type: "mongodb",
    url: "mongodb+srv://marterm35:UnlmwQiuMsE9WPha@tech-post.mn9ecth.mongodb.net/techpost?retryWrites=true&w=majority&appName=tech-post",
    useNewUrlParser: true,
    useUnifiedTopology: true,
    synchronize: true,
    logging: false,
    entities: [Post],
    migrations: [CreatePostTable1720664501470],
    subscribers: [],
});