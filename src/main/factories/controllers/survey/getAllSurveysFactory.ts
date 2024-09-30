import { makeLogControllerDecorator } from "@main/factories/decorators/logDecoratorFactory"
import { GetAllSurveysController } from "@presentation/controllers/survey/getAllSurveys/getAllSurveysController"
import { Controller } from "@presentation/protocols"
import { GetAllSurveysUseCase } from "@domain/usecases/survey/getAllSurveys/getAllSurveysUseCase"
import { MysqlSurveyRepository } from "@infra/db/mysql/repositories/survey/mysqlSurveyRepository"

export function makeGetAllSurveysController(): Controller {
    const mysqlSurveyRepository = new MysqlSurveyRepository()
    const getAllSurveysUseCase = new GetAllSurveysUseCase(mysqlSurveyRepository)
    const getAllSurveysController = new GetAllSurveysController(getAllSurveysUseCase)

    return makeLogControllerDecorator(getAllSurveysController)
}
