// src/modules/characters/characters.controller.ts
import { Controller, Get, Param } from '@nestjs/common';
import { CharactersService } from './characters.service';

@Controller('characters')
export class CharactersController {
  constructor(private readonly charactersService: CharactersService) {}

  // GET /characters → lista de personajes
  @Get()
  async getAllCharacters() {
    return await this.charactersService.getAllCharacters();
  }

  // GET /characters/:id → detalle de un personaje
  @Get(':id')
  async getCharacterById(@Param('id') id: string) {
    return await this.charactersService.getCharacterById(Number(id));
  }
}
