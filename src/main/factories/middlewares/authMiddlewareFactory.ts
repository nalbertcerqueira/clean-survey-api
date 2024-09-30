import { Controller } from "@presentation/protocols"
import { JwtTokenService } from "@infra/services/jwtTokenService"
import { makeLogControllerDecorator } from "@main/factories/decorators/logDecoratorFactory"
import { IRole } from "@domain/entities/account"
import { AuthorizationMiddleware } from "@presentation/middlewares/authorizationMiddleware"
import { AuthorizationUseCase } from "@domain/usecases/auth/authorization/authorizationUseCase"
import { MysqlAccountRepository } from "@infra/db/mysql/repositories/account/mysqlAccountRepository"
import { MysqlAccountTokenRepository } from "@infra/db/mysql/repositories/accountToken/mysqlAccountTokenRepository"
import dotenv from "dotenv"

dotenv.config()

export function makeAuthMiddleware(role?: IRole): Controller {
    const secretKey = process.env.SECRET_KEY as string

    const mysqlAccountRepository = new MysqlAccountRepository()
    const mysqlAccountTokenRepository = new MysqlAccountTokenRepository()
    const jwtTokenService = new JwtTokenService(secretKey)
    const authorizationUseCase = new AuthorizationUseCase(
        jwtTokenService,
        mysqlAccountTokenRepository,
        mysqlAccountRepository
    )

    const authorizationMiddleware = new AuthorizationMiddleware(authorizationUseCase, role)
    return makeLogControllerDecorator(authorizationMiddleware)
}
