import { ISurveyResultRegistry } from "@domain/entities/surveyResult"

export type UpdateSurveyResultInputDTO = Omit<ISurveyResultRegistry, "id" | "updatedAt">
