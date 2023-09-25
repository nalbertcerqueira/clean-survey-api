import { IAccount } from "@domain/entities/account"
export * from "@domain/services/schemaValidatorService"

export type LoginData = Pick<IAccount, "email" | "password">
