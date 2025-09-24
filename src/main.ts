import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ExpressAdapter } from '@nestjs/platform-express';
import { INestApplication } from '@nestjs/common';
import express from 'express';

let cachedApp: express.Express;

async function createApp(): Promise<express.Express> {
  if (cachedApp) {
    return cachedApp;
  }

  const expressApp = express();
  const adapter = new ExpressAdapter(expressApp);
  
  const app: INestApplication = await NestFactory.create(AppModule, adapter, {
    logger: process.env.NODE_ENV === 'production' ? ['error', 'warn'] : ['error', 'warn', 'log'],
  });

  app.enableCors();
  
  await app.init();
  
  cachedApp = expressApp;
  return expressApp;
}

// Para desarrollo local
async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.enableCors();
  await app.listen(3000);
  console.log('Application is running on: http://localhost:3000');
}

// Ejecutar solo en desarrollo
if (process.env.NODE_ENV !== 'production') {
  bootstrap();
}

// Handler para Vercel
export default async (req: any, res: any) => {
  try {
    const app = await createApp();
    return app(req, res);
  } catch (error) {
    console.error('Serverless function error:', error);
    return res.status(500).json({ 
      error: 'Internal Server Error',
      message: error.message,
      stack: process.env.NODE_ENV === 'development' ? error.stack : undefined
    });
  }
};