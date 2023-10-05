import { DeleteSurveyResultRepository } from "@domain/repositories/surveyResult/deleteSurveyResultRepository"

//Caso de uso para excluir um registro de resposta de um usuário no repositório
export class DeleteSurveyResultUseCase {
    constructor(private readonly deleteSurveyResultRepository: DeleteSurveyResultRepository) {}

    public async execute(surveyId: string, accountId: string): Promise<boolean> {
        const deletedRegistry = await this.deleteSurveyResultRepository.delete(surveyId, accountId)

        if (!deletedRegistry) {
            return false
        }
        return true
    }
}
