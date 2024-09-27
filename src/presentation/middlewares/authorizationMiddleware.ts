import { HttpRequest, HttpResponse, Middleware } from "@presentation/protocols"
import { serverError, success, unauthorized } from "@presentation/helpers/httpHelpers"
import { AuthorizationUseCase } from "@domain/usecases/auth/authorization/authorizationUseCase"
import { Role } from "@domain/entities/account"

//Middleware responsável por enviar uma resposta informado se as credenciais
//do usuário, token e role, são validas.
export class AuthorizationMiddleware implements Middleware {
    constructor(
        private readonly authorizationUseCase: AuthorizationUseCase,
        private readonly role?: Role
    ) {}

    public async handle(httpRequest: HttpRequest): Promise<HttpResponse> {
        const authHeader = httpRequest.headers?.authorization
        const accessToken = authHeader?.split(" ")[1] || ""

        try {
            const accountId = await this.authorizationUseCase.execute(accessToken, this.role)
            if (!accountId) {
                const headers = { "WWW-Authenticate": `Bearer realm="protected resources"` }
                return unauthorized("You need valid credentials to access this content", headers)
            }

            return success({ accountId })
        } catch (error: any) {
            return serverError(error)
        }
    }
}
