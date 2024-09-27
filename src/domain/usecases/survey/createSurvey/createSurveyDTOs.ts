import { ISurvey, ISurveyAnswer } from "@domain/entities/survey"

export interface CreateSurveyInputDTO extends Pick<ISurvey, "question"> {
    answers: (Pick<ISurveyAnswer, "answer"> & { image?: string })[]
}
