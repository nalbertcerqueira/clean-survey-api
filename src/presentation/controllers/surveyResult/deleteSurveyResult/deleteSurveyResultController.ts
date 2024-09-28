import { Controller, HttpRequest, HttpResponse } from "@presentation/protocols"
import { notFound, serverError, success } from "@presentation/helpers/httpHelpers"
import { DeleteSurveyResultUseCase } from "@domain/usecases/surveyResult/deleteSurveyResult/deleteSurveyResultUseCase"
import { FindSurveyByIdUseCase } from "@domain/usecases/survey/findSurvey/findeSurveyByIdUseCase"

//Controlador responsável por excluir um registro de resposta do usuário
export class DeleteSurveyResultController implements Controller {
    constructor(
        private readonly findSurveyByIdUseCase: FindSurveyByIdUseCase,
        private readonly deleteSurveyResultUseCase: DeleteSurveyResultUseCase
    ) {}

    public async handle(httpRequest: HttpRequest): Promise<HttpResponse> {
        const id = httpRequest.params?.id as string
        const accountId = httpRequest.locals?.accountId as string

        try {
            const foundSurvey = await this.findSurveyByIdUseCase.execute(id)
            if (!foundSurvey) {
                return notFound(`Survey with id '${id}' not found`)
            }

            const isDeleted = await this.deleteSurveyResultUseCase.execute(id, accountId)
            if (!isDeleted) {
                return notFound(`Result registry not found`)
            }

            return success(null)
        } catch (error: any) {
            return serverError(error)
        }
    }
}
