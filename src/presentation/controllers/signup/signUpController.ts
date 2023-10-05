import { badRequest, conflict, serverError, success } from "@presentation/helpers/httpHelpers"
import { Controller, HttpRequest, HttpResponse } from "@presentation/protocols/index"
import { SchemaValidatorService } from "@domain/services/schemaValidatorService"
import { CreateAccountUseCase } from "@domain/usecases/account/createAccount/createAccountUseCase"

//Controlador responsável pelo cadastro de um usuário
export class SignUpController implements Controller {
    constructor(
        private readonly schemaValidator: SchemaValidatorService,
        private readonly createAccountUseCase: CreateAccountUseCase
    ) {}

    public async handle(httpRequest: HttpRequest): Promise<HttpResponse> {
        const { name, email, password, role } = httpRequest.body

        try {
            const validationResult = await this.schemaValidator.validate(httpRequest.body)
            if (!validationResult.isValid) {
                return badRequest(validationResult.errors)
            }

            const newAccount = await this.createAccountUseCase.execute({
                name,
                email,
                password,
                role
            })
            if (!newAccount) {
                const errorMsg = `Email '${email}' is already associated with an existing account`
                return conflict([errorMsg])
            }

            return success(newAccount)
        } catch (error: any) {
            return serverError(error)
        }
    }
}
