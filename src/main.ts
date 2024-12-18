import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import * as morgan from 'morgan'; 

async function bootstrap() {
  const app = await NestFactory.create(AppModule, {logger:['error', 'warn', 'verbose', 'log']});
  app.use(morgan('combined')); // Utiliser le format souhaité (ex. 'combined', 'dev', etc.)
  app.useGlobalPipes(new ValidationPipe());
  const config = new DocumentBuilder()
    .setTitle('DressCode API')
    .setDescription('API for virtual wardrobe management')
    .setVersion('1.0')
    .build();

  const documentFactory = () => SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, documentFactory);

  await app.listen(process.env.PORT ?? 3000);
  console.log(`Application is running on: http://localhost:3000/`);
}
bootstrap();
