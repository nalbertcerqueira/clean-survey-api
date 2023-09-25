import { makeLogControllerDecorator } from "@main/factories/decorators/logDecoratorFactory"
import { MongoSurveyRepository } from "@infra/db/mongo/repositories/survey/mongoSurveyRepository"
import { MongoSurveyResultRepository } from "@infra/db/mongo/repositories/surveyResult/mongoSurveyResultRepository"
import { YupUpdateSurveyResultValidator } from "@infra/validators/surveyResult/updateSurveyResult/yupUpdateSurveyResultValidator"
import { Controller } from "@presentation/protocols"
import { UpdateSurveyResultController } from "@presentation/controllers/surveyResult/updateSurveyResult/updateSurveyResultController"
import { UpdateSurveyResultUseCase } from "@domain/usecases/surveyResult/updateSurveyResult/updateSurveyResultUseCase"

export function makeUpdateSurveyResultController(): Controller {
    const yupSchemaValidator = new YupUpdateSurveyResultValidator()
    const mongoSurveyResultRepository = new MongoSurveyResultRepository()
    const mongoSurveyRepository = new MongoSurveyRepository()
    const updateSurveyResultUseCase = new UpdateSurveyResultUseCase(
        mongoSurveyResultRepository,
        mongoSurveyResultRepository,
        mongoSurveyRepository
    )
    const updateSurveyResultController = new UpdateSurveyResultController(
        updateSurveyResultUseCase,
        yupSchemaValidator
    )

    return makeLogControllerDecorator(updateSurveyResultController)
}
