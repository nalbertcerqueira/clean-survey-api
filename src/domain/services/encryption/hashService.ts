//Abstração de um serviço geração de hashes criptografados
export interface HashService {
    hash(input: string): Promise<string>
}
