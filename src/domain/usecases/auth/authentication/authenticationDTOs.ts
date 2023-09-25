import { IAccount } from "@domain/entities/account"

export type AuthenticationInputDTO = Omit<IAccount, "id" | "name">
