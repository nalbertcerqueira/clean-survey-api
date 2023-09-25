import { MongoAccountModel } from "@infra/db/mongo/models/index"
export { MongoAccountModel } from "@infra/db/mongo/models/index"
export { IAccount } from "@domain/entities/account"
export * from "@domain/repositories/account/findAccountByEmailRepository"
export * from "@domain/repositories/account/findAccountByIdRepository"
export * from "@domain/repositories/account/addAccountRepository"
export { FindOptions } from "mongodb"

export type FoundAccount = Omit<MongoAccountModel, "createdAt" | "updatedAt">
