import { NestFactory } from '@nestjs/core';
import { AppModule, ObserveInstrument } from './app.module.js';

import { ValidationPipe } from '@nestjs/common';


async function bootstrap() {
  const app = await NestFactory.create(AppModule, {
    instrument: ObserveInstrument,
  });

   



   app.setGlobalPrefix("api");

   app.enableCors({
    origin: 'http://localhost:3000',
  });

   app.useGlobalPipes(

    new ValidationPipe({
      whitelist: true,
      forbidNonWhitelisted: true, 
      transform: true
    })
   )
   
   const port = process.env.PORT ?? 3001;

  await app.listen(port);
}
await bootstrap();
