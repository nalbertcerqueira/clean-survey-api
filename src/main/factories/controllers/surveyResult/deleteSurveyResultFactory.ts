import { makeLogControllerDecorator } from "@main/factories/decorators/logDecoratorFactory"
import { MongoSurveyRepository } from "@infra/db/mongo/repositories/survey/mongoSurveyRepository"
import { MongoSurveyResultRepository } from "@infra/db/mongo/repositories/surveyResult/mongoSurveyResultRepository"
import { DeleteSurveyResultController } from "@presentation/controllers/surveyResult/deleteSurveyResult/deleteSurveyResultController"
import { DeleteSurveyResultUseCase } from "@domain/usecases/surveyResult/deleteSurveyResult/deleteSurveyResultUseCase"
import { FindSurveyByIdUseCase } from "@domain/usecases/survey/findSurvey/findeSurveyByIdUseCase"

export function makeDeleteSurveyResultController() {
    const mongoSurveyRepository = new MongoSurveyRepository()
    const mongoSurveyResultRepository = new MongoSurveyResultRepository()
    const findSurveyByIdUseCase = new FindSurveyByIdUseCase(mongoSurveyRepository)
    const deleteSurveyResultUseCase = new DeleteSurveyResultUseCase(mongoSurveyResultRepository)

    const deleteSurveyResultController = new DeleteSurveyResultController(
        findSurveyByIdUseCase,
        deleteSurveyResultUseCase
    )
    return makeLogControllerDecorator(deleteSurveyResultController)
}
