import { HttpService } from '@nestjs/axios';
export declare class CharactersService {
    private readonly httpService;
    constructor(httpService: HttpService);
    private API_URL;
    getAllCharacters(): Promise<any>;
    getCharacterById(id: number): Promise<{
        id: any;
        name: any;
        status: any;
        species: any;
        origin: any;
        image: any;
    }>;
}
