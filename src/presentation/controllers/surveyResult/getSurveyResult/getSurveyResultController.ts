import { GetSurveyResultUseCase } from "@domain/usecases/surveyResult/getSurveyResult/getSurveyResultUseCase"
import { notFound, serverError, success } from "@presentation/helpers/httpHelpers"
import { HttpRequest, HttpResponse } from "@presentation/protocols"
import { Controller } from "@presentation/protocols/controller"

//Controlador responsável retornar o resultado de uma enquete
export class GetSurveyResultController implements Controller {
    constructor(private readonly getSurveyResultUseCase: GetSurveyResultUseCase) {}

    async handle(httpRequest: HttpRequest): Promise<HttpResponse> {
        const surveyId = httpRequest.params?.id as string

        try {
            const surveyResult = await this.getSurveyResultUseCase.execute(surveyId)
            if (!surveyResult) {
                return notFound(`Survey with id '${surveyId}' not found`)
            }

            return success(surveyResult)
        } catch (error: any) {
            return serverError(error)
        }
    }
}
