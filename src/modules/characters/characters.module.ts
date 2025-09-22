// src/modules/characters/characters.module.ts
import { Module } from '@nestjs/common';
import { HttpModule } from '@nestjs/axios';
import { CharactersService } from './characters.service';
import { CharactersController } from './characters.controller';

@Module({
  imports: [HttpModule],
  providers: [CharactersService],
  controllers: [CharactersController],
})
export class CharactersModule {}
