import { ISurveyResultRegistry } from "@domain/entities/surveyResult"

//Representa a operação de remoção de um registro de resposta de um usuário no repositório
export interface DeleteSurveyResultRepository {
    delete(surveyId: string, accountId: string): Promise<ISurveyResultRegistry | null>
}
