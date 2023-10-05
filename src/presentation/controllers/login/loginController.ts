import { badRequest, serverError, success, unauthorized } from "@presentation/helpers/httpHelpers"
import { Controller, HttpRequest, HttpResponse } from "@presentation/protocols"
import { SchemaValidatorService } from "@domain/services/schemaValidatorService"
import { AuthenticationUseCase } from "@domain/usecases/auth/authentication/authenticationUseCase"

//Controlador responsável pelo login do usuário
export class LoginController implements Controller {
    constructor(
        private readonly schemaValidator: SchemaValidatorService,
        private readonly authenticationUseCase: AuthenticationUseCase
    ) {}

    public async handle(httpRequest: HttpRequest): Promise<HttpResponse> {
        const { email, password } = httpRequest.body
        const validationResult = await this.schemaValidator.validate(httpRequest.body)

        try {
            if (!validationResult.isValid) {
                return badRequest(validationResult.errors)
            }

            const accessToken = await this.authenticationUseCase.execute({ email, password })

            if (!accessToken) {
                return unauthorized("Invalid email or password")
            }

            return success({ token: accessToken })
        } catch (error: any) {
            return serverError(error)
        }
    }
}
