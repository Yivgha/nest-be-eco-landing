import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // Enable CORS with specific options
  app.enableCors({
    origin: ['http://localhost:3000', 'http://localhost:3030'], // List of allowed origins
    methods: ['GET', 'POST', 'PUT', 'DELETE'], // List of allowed HTTP methods
    allowedHeaders: ['Content-Type', 'Authorization'], // List of allowed headers
    credentials: true, // Allow sending cookies cross-origin
  });

  await app.listen(3030);
}
bootstrap();
