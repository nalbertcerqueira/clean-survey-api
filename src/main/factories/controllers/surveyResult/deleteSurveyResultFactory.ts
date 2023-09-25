import { makeLogControllerDecorator } from "@main/factories/decorators/logDecoratorFactory"
import { MongoSurveyRepository } from "@infra/db/mongo/repositories/survey/mongoSurveyRepository"
import { MongoSurveyResultRepository } from "@infra/db/mongo/repositories/surveyResult/mongoSurveyResultRepository"
import { DeleteSurveyResultController } from "@presentation/controllers/surveyResult/deleteSurveyResult/deleteSurveyResultController"
import { DeleteSurveyResultUseCase } from "@domain/usecases/surveyResult/deleteSurveyResult/deleteSurveyResultUseCase"

export function makeDeleteSurveyResultController() {
    const mongoSurveyRepository = new MongoSurveyRepository()
    const mongoSurveyResultRepository = new MongoSurveyResultRepository()
    const deleteSurveyResultUseCase = new DeleteSurveyResultUseCase(mongoSurveyResultRepository)

    const deleteSurveyResultController = new DeleteSurveyResultController(
        mongoSurveyRepository,
        deleteSurveyResultUseCase
    )
    return makeLogControllerDecorator(deleteSurveyResultController)
}
