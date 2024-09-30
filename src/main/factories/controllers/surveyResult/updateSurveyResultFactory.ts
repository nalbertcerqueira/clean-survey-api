import { makeLogControllerDecorator } from "@main/factories/decorators/logDecoratorFactory"
import { YupUpdateSurveyResultValidator } from "@infra/validators/surveyResult/updateSurveyResult/yupUpdateSurveyResultValidator"
import { Controller } from "@presentation/protocols"
import { UpdateSurveyResultController } from "@presentation/controllers/surveyResult/updateSurveyResult/updateSurveyResultController"
import { UpdateSurveyResultUseCase } from "@domain/usecases/surveyResult/updateSurveyResult/updateSurveyResultUseCase"
import { MysqlSurveyResultRepository } from "@infra/db/mysql/repositories/surveyResult/mysqlSurveyResultRepository"
import { MysqlSurveyRepository } from "@infra/db/mysql/repositories/survey/mysqlSurveyRepository"

export function makeUpdateSurveyResultController(): Controller {
    const yupSchemaValidator = new YupUpdateSurveyResultValidator()

    const mysqlSurveyRepository = new MysqlSurveyRepository()
    const mysqlSurveyResultRepository = new MysqlSurveyResultRepository()

    const updateSurveyResultUseCase = new UpdateSurveyResultUseCase(
        mysqlSurveyResultRepository,
        mysqlSurveyResultRepository,
        mysqlSurveyRepository
    )
    const updateSurveyResultController = new UpdateSurveyResultController(
        updateSurveyResultUseCase,
        yupSchemaValidator
    )

    return makeLogControllerDecorator(updateSurveyResultController)
}
