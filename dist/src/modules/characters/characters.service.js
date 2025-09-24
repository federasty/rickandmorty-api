"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.CharactersService = void 0;
const common_1 = require("@nestjs/common");
const axios_1 = require("@nestjs/axios");
const rxjs_1 = require("rxjs");
let CharactersService = class CharactersService {
    httpService;
    constructor(httpService) {
        this.httpService = httpService;
    }
    API_URL = 'https://rickandmortyapi.com/api/character';
    async getAllCharacters() {
        const response = await (0, rxjs_1.firstValueFrom)(this.httpService.get(this.API_URL));
        return response.data.results.map((char) => ({
            id: char.id,
            name: char.name,
            status: char.status,
            species: char.species,
            origin: char.origin?.name,
            image: char.image,
        }));
    }
    async getCharacterById(id) {
        const response = await (0, rxjs_1.firstValueFrom)(this.httpService.get(`${this.API_URL}/${id}`));
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
};
exports.CharactersService = CharactersService;
exports.CharactersService = CharactersService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [axios_1.HttpService])
], CharactersService);
//# sourceMappingURL=characters.service.js.map