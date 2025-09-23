import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ExpressAdapter } from '@nestjs/platform-express';
import express from 'express';
import { Server } from 'http';

let server: Server;

export default async function handler(req: any, res: any) {
  if (!server) {
    const expressApp = express();
    const app = await NestFactory.create(AppModule, new ExpressAdapter(expressApp));
    await app.init();
    server = expressApp.listen(); // sin puerto fijo
  }

  (server as any).emit('request', req, res);
}
