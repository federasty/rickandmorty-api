// src/modules/characters/characters.service.ts
import { Injectable } from '@nestjs/common';
import axios from 'axios';

interface CacheEntry {
  data: any;
  expiry: number;
}

@Injectable()
export class CharactersService {
  private readonly baseUrl = 'https://rickandmortyapi.com/api/character';
  private cache = new Map<string, CacheEntry>();

  private normalizeCharacter(character: any) {
    return {
      id: character.id,
      name: character.name,
      status: character.status,
      species: character.species,
      origin: character.origin?.name,
      image: character.image,
    };
  }

  async getAllCharacters(filters?: { status?: string; name?: string }) {
    const params = new URLSearchParams();

    if (filters?.status) params.append('status', filters.status);
    if (filters?.name) params.append('name', filters.name);

    const cacheKey = params.toString() || 'all';

    // Revisar cache
    const cached = this.cache.get(cacheKey);
    if (cached && cached.expiry > Date.now()) {
      return cached.data;
    }

    const response = await axios.get(`${this.baseUrl}?${params.toString()}`);
    const characters = response.data.results.map((c: any) =>
      this.normalizeCharacter(c),
    );

    // Guardar en cache (30s)
    this.cache.set(cacheKey, {
      data: characters,
      expiry: Date.now() + 30 * 1000,
    });

    return characters;
  }

  async getCharacterById(id: number) {
    const cacheKey = `id-${id}`;
    const cached = this.cache.get(cacheKey);
    if (cached && cached.expiry > Date.now()) {
      return cached.data;
    }

    const response = await axios.get(`${this.baseUrl}/${id}`);
    const character = this.normalizeCharacter(response.data);

    this.cache.set(cacheKey, {
      data: character,
      expiry: Date.now() + 30 * 1000,
    });

    return character;
  }
}
