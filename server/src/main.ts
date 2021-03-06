import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as cookieParser from "cookie-parser";
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import * as express from 'express';
import * as compression from 'compression';
import { join } from 'path';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, {
    // logger: false,
    bodyParser: true,
  });

  app.enableCors({
    origin: 'http://localhost:5000',
    credentials: true
  })
  app.use(compression());

  app.use('/uploads', express.static(join(process.cwd(), 'uploads')));
  app.setGlobalPrefix('api');
  app.use(cookieParser());
  app.useGlobalPipes(new ValidationPipe());

  const config = new DocumentBuilder()
    .setTitle('Library Management API')
    .setVersion('1.0')
    .addTag('auth')
    .addTag('students')
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document);


  await app.listen(3000, async () => {
    console.log(`Listening on ${await app.getUrl()}`);
  });
}
bootstrap();