import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

// Para desarrollo local
async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.enableCors();
  await app.listen(3000);
  console.log('Application is running on: http://localhost:3000');
}

// Ejecutar solo en desarrollo
if (process.env.NODE_ENV !== 'production' && !process.env.VERCEL) {
  bootstrap();
}