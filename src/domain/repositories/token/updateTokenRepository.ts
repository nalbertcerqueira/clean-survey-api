//Abstração para a operação de atualizar o token de um usuário no repositório
import { IAccountToken } from "@domain/entities/accountToken"

export type TokenNames = IAccountToken["tokenName"]

export interface UpdateTokenRepository {
    update(accountId: string, token: string, tokenName: TokenNames): Promise<void>
}
