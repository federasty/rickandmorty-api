// src/modules/characters/characters.service.ts
import { Injectable } from '@nestjs/common';
import { HttpService } from '@nestjs/axios';
import { firstValueFrom } from 'rxjs';

@Injectable()
export class CharactersService {
  constructor(private readonly httpService: HttpService) {}

  private API_URL = 'https://rickandmortyapi.com/api/character';

  // Trae lista de personajes
  async getAllCharacters() {
    const response = await firstValueFrom(
      this.httpService.get(this.API_URL),
    );

    // Normalizar la data
    return response.data.results.map((char: any) => ({
      id: char.id,
      name: char.name,
      status: char.status,
      species: char.species,
      origin: char.origin?.name,
      image: char.image,
    }));
  }

  // Trae detalle de un personaje por ID
  async getCharacterById(id: number) {
    const response = await firstValueFrom(
      this.httpService.get(`${this.API_URL}/${id}`),
    );

    const char = response.data;
    return {
      id: char.id,
      name: char.name,
      status: char.status,
      species: char.species,
      origin: char.origin?.name,
      image: char.image,
    };
  }
}
