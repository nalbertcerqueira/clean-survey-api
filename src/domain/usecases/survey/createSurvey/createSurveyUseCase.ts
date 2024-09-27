import { CreateSurveyInputDTO } from "./createSurveyDTOs"
import { SurveyAnswer } from "@domain/entities/survey"
import { AddSurveyRepository } from "@domain/repositories/survey/addSurveyRepository"

//Caso de uso para criação de uma enquete
export class CreateSurveyUseCase {
    constructor(private readonly addSurveyRepository: AddSurveyRepository) {}

    public async execute(rawSurvey: CreateSurveyInputDTO): Promise<void> {
        const { question, answers } = rawSurvey

        const answersWithId = answers.map(
            (value, i) =>
                new SurveyAnswer({
                    id: `${i + 1}`,
                    answer: value.answer,
                    image: value.image ?? null
                })
        )

        await this.addSurveyRepository.add({
            question,
            answers: answersWithId
        })
    }
}
