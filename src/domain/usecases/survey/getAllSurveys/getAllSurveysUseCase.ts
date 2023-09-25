import { ISurvey } from "@domain/entities/survey"
import { GetSurveysRepository } from "@domain/repositories/survey/getSurveysRepository"

//Caso de uso que busca todas as enquetes armazenadas no repositório
export class GetAllSurveysUseCase {
    constructor(private readonly getSurveysRepository: GetSurveysRepository) {}

    async execute(): Promise<ISurvey[]> {
        const surveys = await this.getSurveysRepository.getAll()
        return surveys
    }
}
