import { makeLogControllerDecorator } from "@main/factories/decorators/logDecoratorFactory"
import { YupCreateSurveyValidator } from "@infra/validators/survey/createSurvey/yupCreateSurveyValidator"
import { CreateSurveyController } from "@presentation/controllers/survey/createSurvey/createSurveyController"
import { Controller } from "@presentation/protocols"
import { CreateSurveyUseCase } from "@domain/usecases/survey/createSurvey/createSurveyUseCase"
import { MysqlSurveyRepository } from "@infra/db/mysql/repositories/survey/mysqlSurveyRepository"

export function makeCreateSurveyController(): Controller {
    const mysqlSurveyRepository = new MysqlSurveyRepository()
    const yupCreateSurveyValidator = new YupCreateSurveyValidator()
    const createSurveyUseCase = new CreateSurveyUseCase(mysqlSurveyRepository)
    const surveyController = new CreateSurveyController(
        yupCreateSurveyValidator,
        createSurveyUseCase
    )

    return makeLogControllerDecorator(surveyController)
}
