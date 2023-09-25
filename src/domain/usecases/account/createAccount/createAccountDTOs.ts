import { IAccount } from "@domain/entities/account"

export type CreateAccountInputDTO = Omit<IAccount, "id">

export type CreateAccountOutputDTO = Omit<IAccount, "password"> | null
