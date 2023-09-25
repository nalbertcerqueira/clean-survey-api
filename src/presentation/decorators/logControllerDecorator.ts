import { serverError } from "@presentation/helpers/httpHelpers"
import { Controller, HttpRequest, HttpResponse } from "@presentation/protocols"
import { LogErrorRepository } from "@domain/repositories/error/logErrorRepository"

//Controlador responsável por receber a resposta de outro controlador
//e, em caso de serverError, armazenar essas informações em um repositório
export class LogControllerDecorator implements Controller {
    constructor(
        private readonly controller: Controller,
        private readonly errorRepository: LogErrorRepository
    ) {}

    async handle(httpRequest: HttpRequest): Promise<HttpResponse> {
        const response = await this.controller.handle(httpRequest)

        if (response.body && response.statusCode === 500) {
            try {
                await this.errorRepository.log(response.body.stack)
            } catch (error: any) {
                console.error(error)
                return serverError(error)
            }
        }

        return response
    }
}
