import { CharactersService } from './characters.service';
export declare class CharactersController {
    private readonly charactersService;
    constructor(charactersService: CharactersService);
    getAllCharacters(status?: string, name?: string): Promise<any>;
    getCharacterById(id: string): Promise<any>;
    health(): Promise<{
        status: string;
    }>;
}
