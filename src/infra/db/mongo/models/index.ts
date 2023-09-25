import { IAccount } from "@domain/entities/account"
import { IAccountToken } from "@domain/entities/accountToken"
import { ISurvey } from "@domain/entities/survey"
import { ObjectId } from "mongodb"

export interface MongoAccountModel extends Omit<IAccount, "id"> {
    _id: ObjectId
    createdAt: number
    updatedAt: number
}

export interface MongoTokenModel extends Omit<IAccountToken, "id"> {
    _id: ObjectId
}

export interface MongoErrorModel {
    _id: ObjectId
    stack: string
    createdAt: number
}

export interface MongoSurveyModel extends Omit<ISurvey, "id"> {
    _id: ObjectId
    updatedAt: number
}
