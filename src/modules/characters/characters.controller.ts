// src/modules/characters/characters.controller.ts
import { Controller, Get, Param, Query } from '@nestjs/common';
import { CharactersService } from './characters.service';

@Controller('characters')
export class CharactersController {
  constructor(private readonly charactersService: CharactersService) {}

  // GET /characters → lista de personajes con filtros
  @Get()
  async getAllCharacters(
    @Query('status') status?: string,
    @Query('name') name?: string,
  ) {
    return await this.charactersService.getAllCharacters({ status, name });
  }

  // GET /characters/:id → detalle de un personaje
  @Get(':id')
  async getCharacterById(@Param('id') id: string) {
    return await this.charactersService.getCharacterById(Number(id));
  }
}
