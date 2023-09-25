import { makeLogControllerDecorator } from "@main/factories/decorators/logDecoratorFactory"
import { MongoSurveyRepository } from "@infra/db/mongo/repositories/survey/mongoSurveyRepository"
import { YupCreateSurveyValidator } from "@infra/validators/survey/createSurvey/yupCreateSurveyValidator"
import { CreateSurveyController } from "@presentation/controllers/survey/createSurvey/createSurveyController"
import { Controller } from "@presentation/protocols"
import { CreateSurveyUseCase } from "@domain/usecases/survey/createSurvey/createSurveyUseCase"

export function makeCreateSurveyController(): Controller {
    const surveyRepository = new MongoSurveyRepository()
    const yupCreateSurveyValidator = new YupCreateSurveyValidator()
    const createSurveyUseCase = new CreateSurveyUseCase(surveyRepository)
    const surveyController = new CreateSurveyController(
        yupCreateSurveyValidator,
        createSurveyUseCase
    )

    return makeLogControllerDecorator(surveyController)
}
