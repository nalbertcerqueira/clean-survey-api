import { ISurveyResult } from "@domain/entities/surveyResult"

//Abstração para buscar/sumarizar o resultado de uma enquete pelo seu id
export interface FindSurveyResultByIdRepository {
    findBySurveyId(surveyId: string): Promise<ISurveyResult | null>
}
