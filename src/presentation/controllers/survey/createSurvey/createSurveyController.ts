import { Controller, HttpRequest, HttpResponse } from "@presentation/protocols"
import { badRequest, created, serverError } from "@presentation/helpers/httpHelpers"
import { SchemaValidatorService } from "@domain/services/schemaValidatorService"
import { CreateSurveyUseCase } from "@domain/usecases/survey/createSurvey/createSurveyUseCase"

//Controlador responsável pela criação de uma enquete
export class CreateSurveyController implements Controller {
    constructor(
        private readonly schemaValidator: SchemaValidatorService,
        private readonly createSurveyUseCase: CreateSurveyUseCase
    ) {}

    async handle(httpRequest: HttpRequest): Promise<HttpResponse> {
        const { question, answers } = httpRequest.body

        try {
            const validationResult = await this.schemaValidator.validate(httpRequest.body)
            if (!validationResult.isValid) {
                return badRequest(validationResult.errors)
            }

            await this.createSurveyUseCase.execute({ question, answers })

            return created()
        } catch (error: any) {
            return serverError(error)
        }
    }
}
