"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.CharactersModule = void 0;
const common_1 = require("@nestjs/common");
const axios_1 = require("@nestjs/axios");
const characters_service_1 = require("./characters.service");
const characters_controller_1 = require("./characters.controller");
let CharactersModule = class CharactersModule {
};
exports.CharactersModule = CharactersModule;
exports.CharactersModule = CharactersModule = __decorate([
    (0, common_1.Module)({
        imports: [axios_1.HttpModule],
        providers: [characters_service_1.CharactersService],
        controllers: [characters_controller_1.CharactersController],
    })
], CharactersModule);
//# sourceMappingURL=characters.module.js.map