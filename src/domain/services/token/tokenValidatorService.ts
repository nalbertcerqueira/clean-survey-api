import { IRole } from "@domain/entities/account"

export interface Payload {
    id: string
    role: IRole
}

//Abstração de um serviço de validação de tokens
export interface TokenValidatorService {
    validate(token: string): Promise<Payload | null>
}
