"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.CharactersService = void 0;
const common_1 = require("@nestjs/common");
const axios_1 = __importDefault(require("axios"));
let CharactersService = class CharactersService {
    baseUrl = 'https://rickandmortyapi.com/api/character';
    cache = new Map();
    normalizeCharacter(character) {
        return {
            id: character.id,
            name: character.name,
            status: character.status,
            species: character.species,
            origin: character.origin?.name,
            image: character.image,
        };
    }
    async getAllCharacters(filters) {
        const params = new URLSearchParams();
        if (filters?.status)
            params.append('status', filters.status);
        if (filters?.name)
            params.append('name', filters.name);
        const cacheKey = params.toString() || 'all';
        const cached = this.cache.get(cacheKey);
        if (cached && cached.expiry > Date.now()) {
            return cached.data;
        }
        const response = await axios_1.default.get(`${this.baseUrl}?${params.toString()}`);
        const characters = response.data.results.map((c) => this.normalizeCharacter(c));
        this.cache.set(cacheKey, {
            data: characters,
            expiry: Date.now() + 30 * 1000,
        });
        return characters;
    }
    async getCharacterById(id) {
        const cacheKey = `id-${id}`;
        const cached = this.cache.get(cacheKey);
        if (cached && cached.expiry > Date.now()) {
            return cached.data;
        }
        const response = await axios_1.default.get(`${this.baseUrl}/${id}`);
        const character = this.normalizeCharacter(response.data);
        this.cache.set(cacheKey, {
            data: character,
            expiry: Date.now() + 30 * 1000,
        });
        return character;
    }
};
exports.CharactersService = CharactersService;
exports.CharactersService = CharactersService = __decorate([
    (0, common_1.Injectable)()
], CharactersService);
//# sourceMappingURL=characters.service.js.map