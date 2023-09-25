//Abstração de um serviço de comparação de hashes criptografados
export interface HashCompareService {
    compare(input: string, hash: string): Promise<boolean>
}
