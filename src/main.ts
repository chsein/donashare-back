import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  //CORS
  app.enableCors({
    origin: '*', // Allow all origins (use specific origins in production)
    methods: 'GET,POST,PUT,DELETE',
    allowedHeaders: 'Content-Type,Authorization', // Add other headers as needed
  });
  await app.listen(process.env.PORT ?? 8080);
}
bootstrap();
