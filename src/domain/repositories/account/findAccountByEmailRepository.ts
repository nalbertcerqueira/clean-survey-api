import { IAccount } from "@domain/entities/account"

//Abstração para encontrar um usuário pelo seu email
export interface FindAccountByEmailRepository {
    findByEmail(email: string): Promise<IAccount | null>
}
