import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ExpressAdapter } from '@nestjs/platform-express';
import express from 'express';

// Variable global para mantener la app
let cachedApp: any = null;

// Función para crear la aplicación NestJS
async function createNestApp() {
  if (cachedApp) {
    return cachedApp;
  }

  const server = express();
  const app = await NestFactory.create(AppModule, new ExpressAdapter(server));
  
  // Configuraciones adicionales
  app.enableCors();
  
  // Inicializar la app
  await app.init();
  
  cachedApp = server;
  return server;
}

// Para desarrollo local
async function bootstrap() {
  try {
    const server = await createNestApp();
    const app = await NestFactory.create(AppModule);
    await app.listen(3000);
    console.log(`🚀 Local server running on http://localhost:3000`);
  } catch (error) {
    console.error('Error starting local server:', error);
  }
}

// Ejecutar solo en desarrollo local (no en Vercel)
if (process.env.NODE_ENV !== 'production' && !process.env.VERCEL) {
  bootstrap();
}

// Export por defecto para Vercel (serverless function)
export default async (req: any, res: any) => {
  try {
    const server = await createNestApp();
    return server(req, res);
  } catch (error) {
    console.error('Vercel handler error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};