import { IAccount } from "@domain/entities/account"

//Abstração para encontrar um usuário pelo seu id
export interface FindAccountByIdRepository {
    findById(id: string, role?: string): Promise<IAccount | null>
}
