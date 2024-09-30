import { makeLogControllerDecorator } from "@main/factories/decorators/logDecoratorFactory"
import { DeleteSurveyResultController } from "@presentation/controllers/surveyResult/deleteSurveyResult/deleteSurveyResultController"
import { DeleteSurveyResultUseCase } from "@domain/usecases/surveyResult/deleteSurveyResult/deleteSurveyResultUseCase"
import { FindSurveyByIdUseCase } from "@domain/usecases/survey/findSurvey/findeSurveyByIdUseCase"
import { MysqlSurveyRepository } from "@infra/db/mysql/repositories/survey/mysqlSurveyRepository"
import { MysqlSurveyResultRepository } from "@infra/db/mysql/repositories/surveyResult/mysqlSurveyResultRepository"

export function makeDeleteSurveyResultController() {
    const mysqlSurveyRepository = new MysqlSurveyRepository()
    const mysqlSurveyResultRepository = new MysqlSurveyResultRepository()
    const findSurveyByIdUseCase = new FindSurveyByIdUseCase(mysqlSurveyRepository)
    const deleteSurveyResultUseCase = new DeleteSurveyResultUseCase(mysqlSurveyResultRepository)

    const deleteSurveyResultController = new DeleteSurveyResultController(
        findSurveyByIdUseCase,
        deleteSurveyResultUseCase
    )
    return makeLogControllerDecorator(deleteSurveyResultController)
}
