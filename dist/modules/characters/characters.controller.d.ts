import { CharactersService } from './characters.service';
export declare class CharactersController {
    private readonly charactersService;
    constructor(charactersService: CharactersService);
    getAllCharacters(): Promise<any>;
    getCharacterById(id: string): Promise<{
        id: any;
        name: any;
        status: any;
        species: any;
        origin: any;
        image: any;
    }>;
}
