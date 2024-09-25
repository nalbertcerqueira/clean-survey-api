import { IAccount } from "@domain/entities/account"

export interface CreateAccountInputDTO extends Omit<IAccount, "id" | "role"> {
    role: Partial<IAccount["role"]>
}

export type CreateAccountOutputDTO = Omit<IAccount, "password"> | null
