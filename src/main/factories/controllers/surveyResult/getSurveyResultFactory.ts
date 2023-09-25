import { makeLogControllerDecorator } from "@main/factories/decorators/logDecoratorFactory"
import { MongoSurveyResultRepository } from "@infra/db/mongo/repositories/surveyResult/mongoSurveyResultRepository"
import { GetSurveyResultController } from "@presentation/controllers/surveyResult/getSurveyResult/getSurveyResultController"
import { Controller } from "@presentation/protocols"
import { GetSurveyResultUseCase } from "@domain/usecases/surveyResult/getSurveyResult/getSurveyResultUseCase"

export function makeGetSurveyResultController(): Controller {
    const mongoSurveyResultRepository = new MongoSurveyResultRepository()
    const getSurveyResultUseCase = new GetSurveyResultUseCase(mongoSurveyResultRepository)
    const getSurveyResultController = new GetSurveyResultController(getSurveyResultUseCase)

    return makeLogControllerDecorator(getSurveyResultController)
}
