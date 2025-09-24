export declare class CharactersService {
    private readonly baseUrl;
    private cache;
    private normalizeCharacter;
    private fetchWithRetry;
    getAllCharacters(filters?: {
        status?: string;
        name?: string;
    }): Promise<any>;
    getCharacterById(id: number): Promise<any>;
    healthCheck(): Promise<{
        status: string;
    }>;
}
