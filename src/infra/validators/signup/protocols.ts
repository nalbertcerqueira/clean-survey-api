import { IAccount } from "@domain/entities/account"
export * from "@domain/services/schemaValidatorService"

export interface SignupData extends Omit<IAccount, "id" | "role"> {
    passwordConfirmation: string
}
