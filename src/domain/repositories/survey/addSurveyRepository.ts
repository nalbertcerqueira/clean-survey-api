import { ISurvey } from "@domain/entities/survey"

export type SurveyWithoutId = Omit<ISurvey, "id" | "createdAt">

//Abstração da operação de adicionar uma enquete em um repositório
export interface AddSurveyRepository {
    add(survey: SurveyWithoutId): Promise<void>
}
