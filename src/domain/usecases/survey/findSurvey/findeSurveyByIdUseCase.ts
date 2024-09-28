import { ISurvey } from "@domain/entities/survey"
import { FindSurveyByIdRepository } from "@domain/repositories/survey/findSurveyByIdRepository"

export class FindSurveyByIdUseCase {
    constructor(private readonly findSurveyRepository: FindSurveyByIdRepository) {}

    public async execute(surveyId: string): Promise<ISurvey | null> {
        const foundSurvey = await this.findSurveyRepository.findById(surveyId)

        return foundSurvey
    }
}
