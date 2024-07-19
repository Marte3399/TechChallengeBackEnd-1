import 'reflect-metadata';
import express from 'express';
import cors from 'cors';
import { AppDataSource } from './database/data-source';
import routers from './app/routes/routes';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { NestFactory } from '@nestjs/core';

const app = express();

app.use(cors());

app.use(express.json());

app.use(routers);

  export async function initializeApp() {
      await AppDataSource.initialize();
      console.log('Data Source has been initialized!');
      return app;
    }
  initializeApp().then(() => {
    console.log('Database OK');
    //const config = new DocumentBuilder()
    //.setTitle('TechchallengBackEnd')
    //.setDescription('The TechchallengBackEnd API description')
    //.setVersion('1.0')
    //.addTag('posts')
    //.build();
    //
    //const document = SwaggerModule.createDocument(app, config);
    //SwaggerModule.setup('api', app, document);
    app.listen(3010, () => {
        console.log('Server started on port 3010');
    })
  }).catch(error => {
      console.error('Error during initialization:', error);
  });
  export async function finalizedApp() {
    await AppDataSource.destroy();
    console.log('Data Source has been finalized!');
    const app = express();
    // ...
    return app;
  }
export default app;