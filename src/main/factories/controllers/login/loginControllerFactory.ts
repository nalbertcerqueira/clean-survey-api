import { Controller } from "@presentation/protocols"
import { JwtTokenService } from "@infra/services/jwtTokenService"
import { LoginController } from "@presentation/controllers/login/loginController"
import { YupLoginValidator } from "@infra/validators/login/yupLoginValidator"
import { BcryptEncrypterService } from "@infra/services/bcryptEncrypterService"
import { MysqlAccountRepository } from "@infra/db/mysql/repositories/account/mysqlAccountRepository"
import { MysqlAccountTokenRepository } from "@infra/db/mysql/repositories/accountToken/mysqlAccountTokenRepository"
import { AuthenticationUseCase } from "@domain/usecases/auth/authentication/authenticationUseCase"
import { makeLogControllerDecorator } from "@main/factories/decorators/logDecoratorFactory"
import dotenv from "dotenv"

dotenv.config()

export function makeLoginController(): Controller {
    const salt = 12
    const secretKey = process.env.SECRET_KEY as string

    const mysqlAccountTokenRepository = new MysqlAccountTokenRepository()
    const mysqlAccountRepository = new MysqlAccountRepository()
    const bcryptEncrypterService = new BcryptEncrypterService(salt)
    const jwtTokenService = new JwtTokenService(secretKey)
    const yupSchemaValidator = new YupLoginValidator()

    const authenticationUseCase = new AuthenticationUseCase(
        mysqlAccountRepository,
        mysqlAccountTokenRepository,
        bcryptEncrypterService,
        jwtTokenService
    )

    const loginController = new LoginController(yupSchemaValidator, authenticationUseCase)
    return makeLogControllerDecorator(loginController)
}
