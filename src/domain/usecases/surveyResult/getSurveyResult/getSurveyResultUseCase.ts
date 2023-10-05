import { ISurveyResult } from "@domain/entities/surveyResult"
import { FindSurveyResultByIdRepository } from "@domain/repositories/surveyResult/findSurveyResultByIdRepository"

//Caso de uso para retornar o resultado de uma enquete
export class GetSurveyResultUseCase {
    constructor(private readonly findSurveyResultRepository: FindSurveyResultByIdRepository) {}

    public async execute(surveyId: string): Promise<ISurveyResult | null> {
        const foundSurvey = await this.findSurveyResultRepository.findBySurveyId(surveyId)

        return foundSurvey
    }
}
