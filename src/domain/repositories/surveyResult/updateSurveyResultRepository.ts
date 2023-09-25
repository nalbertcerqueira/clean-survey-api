import { ISurveyResultRegistry } from "@domain/entities/surveyResult"

export type ResultRegistry = Omit<ISurveyResultRegistry, "id" | "updatedAt">

//Representa a operação de atualização de um registro de resposta de um usuário
export interface UpdateSurveyResultRepository {
    update(resultRegistry: ResultRegistry): Promise<void>
}
