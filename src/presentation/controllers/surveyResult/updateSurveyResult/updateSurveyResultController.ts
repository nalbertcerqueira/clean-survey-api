import { Controller, HttpRequest, HttpResponse } from "@presentation/protocols"
import { badRequest, notFound, serverError, success } from "@presentation/helpers/httpHelpers"
import { UpdateSurveyResultUseCase } from "@domain/usecases/surveyResult/updateSurveyResult/updateSurveyResultUseCase"
import { SchemaValidatorService } from "@domain/services/schemaValidatorService"

//Controlador responsável por atualizar registro de resposta de um usuário
export class UpdateSurveyResultController implements Controller {
    constructor(
        private readonly updateSurveyResultUseCase: UpdateSurveyResultUseCase,
        private readonly schemaValidator: SchemaValidatorService
    ) {}

    public async handle(httpRequest: HttpRequest): Promise<HttpResponse> {
        const { body, params, locals } = httpRequest
        const answerId = body?.answerId as string
        const surveyId = params?.id as string
        const accountId = locals?.accountId as string

        try {
            const validationResult = await this.schemaValidator.validate(body)
            if (!validationResult.isValid) {
                return badRequest(validationResult.errors)
            }

            const surveyResult = await this.updateSurveyResultUseCase.execute({
                accountId,
                surveyId,
                answerId
            })

            if (!surveyResult) {
                return notFound(
                    `Survey with id '${surveyId}' and answer id '${answerId}' not found`
                )
            }

            return success(surveyResult)
        } catch (error: any) {
            return serverError(error)
        }
    }
}
