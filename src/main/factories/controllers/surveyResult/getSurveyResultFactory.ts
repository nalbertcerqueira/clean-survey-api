import { makeLogControllerDecorator } from "@main/factories/decorators/logDecoratorFactory"
import { GetSurveyResultController } from "@presentation/controllers/surveyResult/getSurveyResult/getSurveyResultController"
import { Controller } from "@presentation/protocols"
import { GetSurveyResultUseCase } from "@domain/usecases/surveyResult/getSurveyResult/getSurveyResultUseCase"
import { MysqlSurveyResultRepository } from "@infra/db/mysql/repositories/surveyResult/mysqlSurveyResultRepository"

export function makeGetSurveyResultController(): Controller {
    const mysqlSurveyResultRepository = new MysqlSurveyResultRepository()
    const getSurveyResultUseCase = new GetSurveyResultUseCase(mysqlSurveyResultRepository)
    const getSurveyResultController = new GetSurveyResultController(getSurveyResultUseCase)

    return makeLogControllerDecorator(getSurveyResultController)
}
