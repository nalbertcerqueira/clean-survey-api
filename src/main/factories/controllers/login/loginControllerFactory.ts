import { makeLogControllerDecorator } from "@main/factories/decorators/logDecoratorFactory"
import { MongoAccountRepository } from "@infra/db/mongo/repositories/account/mongoAccountRepository"
import { BcryptEncrypterService } from "@infra/services/bcryptEncrypterService"
import { JwtTokenService } from "@infra/services/jwtTokenService"
import { YupLoginValidator } from "@infra/validators/login/yupLoginValidator"
import { MongoAccountTokenRepository } from "@infra/db/mongo/repositories/accountToken/mongoAccountTokenRepository"
import { LoginController } from "@presentation/controllers/login/loginController"
import { Controller } from "@presentation/protocols"
import { AuthenticationUseCase } from "@domain/usecases/auth/authentication/authenticationUseCase"
import dotenv from "dotenv"

dotenv.config()

export function makeLoginController(): Controller {
    const salt = 12
    const secretKey = process.env.SECRET_KEY as string

    const mongoAccountTokenRepository = new MongoAccountTokenRepository()
    const mongoAccountRepository = new MongoAccountRepository()
    const bcryptEncrypterService = new BcryptEncrypterService(salt)
    const jwtTokenService = new JwtTokenService(secretKey)
    const yupSchemaValidator = new YupLoginValidator()

    const authenticationUseCase = new AuthenticationUseCase(
        mongoAccountRepository,
        mongoAccountTokenRepository,
        bcryptEncrypterService,
        jwtTokenService
    )

    const loginController = new LoginController(yupSchemaValidator, authenticationUseCase)
    return makeLogControllerDecorator(loginController)
}
