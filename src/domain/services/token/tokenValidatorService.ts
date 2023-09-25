export interface Payload {
    id: string
}

//Abstração de um serviço de validação de tokens
export interface TokenValidatorService {
    validate(token: string): Promise<Payload | null>
}
