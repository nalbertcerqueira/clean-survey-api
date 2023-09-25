import { Controller, HttpResponse } from "@presentation/protocols"
import { serverError, success } from "@presentation/helpers/httpHelpers"
import { GetAllSurveysUseCase } from "@domain/usecases/survey/getAllSurveys/getAllSurveysUseCase"

//Controlador responsável enviar um array contendo todas as enquetes
export class GetAllSurveysController implements Controller {
    constructor(private readonly getAllSurveysUseCase: GetAllSurveysUseCase) {}

    async handle(): Promise<HttpResponse> {
        try {
            const surveys = await this.getAllSurveysUseCase.execute()
            return success(surveys)
        } catch (error: any) {
            return serverError(error)
        }
    }
}
