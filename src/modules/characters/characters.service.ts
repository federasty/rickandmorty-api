// src/modules/characters/characters.service.ts
import { Injectable } from '@nestjs/common';
import axios, { AxiosResponse } from 'axios';

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

  // --- NUEVO: Función helper con retry y timeout ---
  private async fetchWithRetry(
    url: string,
    retries = 3,
    timeout = 2000, // ms
  ): Promise<any> {
    let lastError: any;

    for (let i = 0; i < retries; i++) {
      try {
        const source = axios.CancelToken.source();
        const timer = setTimeout(() => source.cancel(), timeout);

        const response: AxiosResponse = await axios.get(url, { cancelToken: source.token });
        clearTimeout(timer);

        return response.data;
      } catch (error) {
        lastError = error;

        // Si hay cache, devolverlo como stale
        const cached = this.cache.get(url);
        if (cached && cached.expiry > Date.now()) {
          return { ...cached.data, stale: true };
        }
      }
    }

    // Si fallaron todos los intentos, lanzar error
    throw lastError;
  }

  // --- MANTENER FUNCIONALIDAD EXISTENTE ---
  async getAllCharacters(filters?: { status?: string; name?: string }) {
    const params = new URLSearchParams();

    if (filters?.status) params.append('status', filters.status);
    if (filters?.name) params.append('name', filters.name);

    const cacheKey = params.toString() || 'all';
    const url = `${this.baseUrl}?${params.toString()}`;

    const cached = this.cache.get(cacheKey);
    if (cached && cached.expiry > Date.now()) return cached.data;

    const data = await this.fetchWithRetry(url);
    const characters = data.results?.map((c: any) => this.normalizeCharacter(c)) || [];

    this.cache.set(cacheKey, {
      data: characters,
      expiry: Date.now() + 30 * 1000,
    });

    return characters;
  }

  async getCharacterById(id: number) {
    const cacheKey = `id-${id}`;
    const url = `${this.baseUrl}/${id}`;

    const cached = this.cache.get(cacheKey);
    if (cached && cached.expiry > Date.now()) return cached.data;

    const data = await this.fetchWithRetry(url);
    const character = this.normalizeCharacter(data);

    this.cache.set(cacheKey, {
      data: character,
      expiry: Date.now() + 30 * 1000,
    });

    return character;
  }

  // --- NUEVO: Health check endpoint ---
  async healthCheck() {
    try {
      await this.fetchWithRetry(this.baseUrl, 1, 1000); // 1 intento, timeout 1s
      return { status: 'ok' };
    } catch {
      return { status: 'error' };
    }
  }
}
