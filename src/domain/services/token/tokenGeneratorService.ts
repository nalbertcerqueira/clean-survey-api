//Abstração de um serviço de geração de tokens
export interface TokenGeneratorService {
    generate(id: string): Promise<string>
}
