import { IAccount } from "@domain/entities/account"

export type AccountWithoutId = Omit<IAccount, "id">

//Abstração para adicionar um usuário a um repositório (banco e dados)
export interface AddAccountRepository {
    add(account: AccountWithoutId): Promise<IAccount>
}
