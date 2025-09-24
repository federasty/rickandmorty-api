import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

// Solo para desarrollo local
async function bootstrap() {
  try {
    const app = await NestFactory.create(AppModule);
    
    // Habilitar CORS
    app.enableCors();
    
    await app.listen(3000);
    console.log(`🚀 Local server running on http://localhost:3000`);
  } catch (error) {
    console.error('Error starting local server:', error);
  }
}

// Ejecutar solo en desarrollo local
if (process.env.NODE_ENV !== 'production' && !process.env.VERCEL) {
  bootstrap();
}