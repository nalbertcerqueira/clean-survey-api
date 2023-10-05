import { UpdateSurveyResultInputDTO } from "./updateSurveyResultDTOs"
import { FindSurveyByIdRepository } from "@domain/repositories/survey/findSurveyByIdRepository"
import { UpdateSurveyResultRepository } from "@domain/repositories/surveyResult/updateSurveyResultRepository"
import { ISurveyResult } from "@domain/entities/surveyResult"
import { FindSurveyResultByIdRepository } from "@domain/repositories/surveyResult/findSurveyResultByIdRepository"

//Caso de uso que atualiza um registro de resposta de um usuário para uma determinada enquete
export class UpdateSurveyResultUseCase {
    constructor(
        private readonly updateSurveyResultRepository: UpdateSurveyResultRepository,
        private readonly findSurveyResultRepository: FindSurveyResultByIdRepository,
        private readonly findSurveyRepository: FindSurveyByIdRepository
    ) {}

    public async execute(
        rawResultRegistry: UpdateSurveyResultInputDTO
    ): Promise<ISurveyResult | null> {
        const { answerId, surveyId } = rawResultRegistry

        const foundSurvey = await this.findSurveyRepository.findById(surveyId)
        const foundAnswer = foundSurvey?.answers.find((answer) => answer.id === answerId)

        if (foundSurvey && foundAnswer) {
            await this.updateSurveyResultRepository.update({ ...rawResultRegistry })

            const surveyResult = await this.findSurveyResultRepository.findBySurveyId(surveyId)
            return surveyResult
        }

        return null
    }
}
