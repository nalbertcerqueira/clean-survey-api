import { ISurveyResultRegistry } from "@domain/entities/surveyResult"

export type UpdateSurveyResultInputDTO = Omit<ISurveyResultRegistry, "createdAt">
