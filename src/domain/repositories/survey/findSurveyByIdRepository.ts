import { ISurvey } from "@domain/entities/survey"

//Abstração da operação de encontrar uma enquete pelo seu id
export interface FindSurveyByIdRepository {
    findById(surveyId: string): Promise<ISurvey | null>
}
