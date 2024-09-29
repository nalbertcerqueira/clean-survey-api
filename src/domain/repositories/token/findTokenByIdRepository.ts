import { IAccountToken } from "@domain/entities/accountToken"

//Abstração para a operação de encontrar um token do usuário
export interface FindTokenByIdRepository {
    findByAccountId(data: Pick<IAccountToken, "accountId" | "name">): Promise<string | null>
}
