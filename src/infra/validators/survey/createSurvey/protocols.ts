import { ISurvey, ISurveyAnswer } from "@domain/entities/survey"
export * from "@domain/services/schemaValidatorService"

export interface SurveyData extends Pick<ISurvey, "question"> {
    answers: (Pick<ISurveyAnswer, "answer"> & { image?: string })[]
}
