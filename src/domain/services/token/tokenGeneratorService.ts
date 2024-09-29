import { IRole } from "@domain/entities/account"

//Abstração de um serviço de geração de tokens
export interface TokenGeneratorService {
    generate(id: string, role: IRole): Promise<string>
}
