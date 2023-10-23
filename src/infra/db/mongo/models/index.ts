import { IAccount } from "@domain/entities/account"
import { IAccountToken } from "@domain/entities/accountToken"
import { ISurvey } from "@domain/entities/survey"
import { ObjectId } from "mongodb"

export interface MongoAccountModel extends Omit<IAccount, "id"> {
    readonly _id: ObjectId
    readonly createdAt: number
    updatedAt: number
}

export interface MongoTokenModel extends Omit<IAccountToken, "id"> {
    readonly _id: ObjectId
}

export interface MongoErrorModel {
    readonly _id: ObjectId
    readonly createdAt: number
    stack: string
}

export interface MongoSurveyModel extends Omit<ISurvey, "id"> {
    readonly _id: ObjectId
    updatedAt: number
}
