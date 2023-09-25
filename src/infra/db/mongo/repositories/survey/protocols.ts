import { MongoSurveyModel } from "@infra/db/mongo/models/index"
export { ISurvey } from "@domain/entities/survey"
export * from "@domain/repositories/survey/addSurveyRepository"
export * from "@domain/repositories/survey/getSurveysRepository"
export * from "@domain/repositories/survey/findSurveyByIdRepository"
export { FindOptions } from "mongodb"

export type FoundSurvey = Omit<MongoSurveyModel, "updatedAt">
