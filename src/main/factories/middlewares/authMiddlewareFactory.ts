import { makeLogControllerDecorator } from "@main/factories/decorators/logDecoratorFactory"
import { MongoAccountRepository } from "@infra/db/mongo/repositories/account/mongoAccountRepository"
import { JwtTokenService } from "@infra/services/jwtTokenService"
import { MongoAccountTokenRepository } from "@infra/db/mongo/repositories/accountToken/mongoAccountTokenRepository"
import { AuthorizationMiddleware } from "@presentation/middlewares/authorizationMiddleware"
import { Controller } from "@presentation/protocols"
import { AuthorizationUseCase } from "@domain/usecases/auth/authorization/authorizationUseCase"
import dotenv from "dotenv"

dotenv.config()

export function makeAuthMiddleware(role?: string): Controller {
    const secretKey = process.env.SECRET_KEY as string

    const mongoAccountRepository = new MongoAccountRepository()
    const mongoAccountTokenRepository = new MongoAccountTokenRepository()
    const jwtTokenService = new JwtTokenService(secretKey)
    const authorizationUseCase = new AuthorizationUseCase(
        jwtTokenService,
        mongoAccountTokenRepository,
        mongoAccountRepository
    )

    const authorizationMiddleware = new AuthorizationMiddleware(authorizationUseCase, role)
    return makeLogControllerDecorator(authorizationMiddleware)
}
