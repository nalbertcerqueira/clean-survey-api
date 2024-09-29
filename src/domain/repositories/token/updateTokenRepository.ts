import { IAccountToken } from "@domain/entities/accountToken"

//Abstração para a operação de atualizar o token de um usuário no repositório
export interface UpdateTokenRepository {
    update(token: IAccountToken): Promise<void>
}
