// api/characters/[id].ts
import { NestFactory } from '@nestjs/core';
import { AppModule } from '../..//src/app.module';
import { INestApplication } from '@nestjs/common';

let app: INestApplication;

const initApp = async (): Promise<INestApplication> => {
  if (app) {
    return app;
  }

  app = await NestFactory.create(AppModule);
  app.enableCors();
  await app.init();
  return app;
};

export default async function handler(req: any, res: any) {
  try {
    console.log('Character ID function is running!', req.method, req.url);
    
    const nestApp = await initApp();
    const httpAdapter = nestApp.getHttpAdapter();
    const instance = httpAdapter.getInstance();
    
    // Obtener el ID de los query parameters de Vercel
    const { id } = req.query;
    
    // Modificar la URL para que funcione con NestJS
    req.url = `/characters/${id}`;
    
    return instance(req, res);
  } catch (error) {
    console.error('Error:', error);
    return res.status(500).json({ 
      error: 'Server Error', 
      message: error.message 
    });
  }
}