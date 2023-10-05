//Abstração da operação de encontrar um token do usuário
import { IAccountToken } from "@domain/entities/accountToken"

export type TokenNames = IAccountToken["tokenName"]

export interface FindTokenByIdRepository {
    findByAccountId(accountId: string, tokenName: TokenNames): Promise<string | null>
}
