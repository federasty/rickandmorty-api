import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ExpressAdapter } from '@nestjs/platform-express';
import express from 'express';

const expressApp = express();

async function bootstrap() {
  const app = await NestFactory.create(AppModule, new ExpressAdapter(expressApp));
  await app.init();

  // 🚨 Si estás en local, levantar servidor normalmente
  if (process.env.VERCEL === undefined) {
    await app.listen(3000);
    console.log(`🚀 Local server running on http://localhost:3000`);
  }
}

// Ejecutar bootstrap sólo en local
if (process.env.VERCEL === undefined) {
  bootstrap();
}

// 🚨 Exportar handler para Vercel
export const handler = expressApp;
