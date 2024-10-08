import { IAccount, IRole } from "@domain/entities/account"
Array
//Abstração para encontrar um usuário pelo seu id
export interface FindAccountByIdRepository {
    findById(id: string, role?: IRole): Promise<IAccount | null>
}
