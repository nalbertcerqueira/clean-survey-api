import { makeLogControllerDecorator } from "@main/factories/decorators/logDecoratorFactory"
import { MongoSurveyRepository } from "@infra/db/mongo/repositories/survey/mongoSurveyRepository"
import { GetAllSurveysController } from "@presentation/controllers/survey/getAllSurveys/getAllSurveysController"
import { Controller } from "@presentation/protocols"
import { GetAllSurveysUseCase } from "@domain/usecases/survey/getAllSurveys/getAllSurveysUseCase"

export function makeGetAllSurveysController(): Controller {
    const mongoSurveyRepository = new MongoSurveyRepository()
    const getAllSurveysUseCase = new GetAllSurveysUseCase(mongoSurveyRepository)
    const getAllSurveysController = new GetAllSurveysController(getAllSurveysUseCase)

    return makeLogControllerDecorator(getAllSurveysController)
}
