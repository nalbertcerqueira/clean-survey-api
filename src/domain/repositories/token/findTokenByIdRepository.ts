import { TokenNames } from "./protocols"

//Abstração para a operação de encontrar um token do usuário
export interface FindTokenByIdRepository {
    findByAccountId(accountId: string, tokenName: TokenNames): Promise<string | null>
}
