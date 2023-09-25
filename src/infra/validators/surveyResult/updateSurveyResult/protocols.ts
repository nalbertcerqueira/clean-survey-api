export * from "@domain/services/schemaValidatorService"
import { ISurveyResultRegistry } from "@domain/entities/surveyResult"

export type SurveyResultData = Pick<ISurveyResultRegistry, "answerId">
