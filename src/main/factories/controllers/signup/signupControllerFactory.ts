import { makeLogControllerDecorator } from "@main/factories/decorators/logDecoratorFactory"
import { BcryptEncrypterService } from "@infra/services/bcryptEncrypterService"
import { YupSignUpValidator } from "@infra/validators/signup/yupSignUpValidator"
import { SignUpController } from "@presentation/controllers/signup/signUpController"
import { Controller } from "@presentation/protocols"
import { CreateAccountUseCase } from "@domain/usecases/account/createAccount/createAccountUseCase"
import { MysqlAccountRepository } from "@infra/db/mysql/repositories/account/mysqlAccountRepository"

export function makeSignUpController(): Controller {
    const salt = 12

    const bcryptEncrypterService = new BcryptEncrypterService(salt)
    const mysqlAccountRepository = new MysqlAccountRepository()

    const yupSchemaValidator = new YupSignUpValidator()
    const createAccountUseCase = new CreateAccountUseCase(
        bcryptEncrypterService,
        mysqlAccountRepository,
        mysqlAccountRepository
    )

    const signUpController = new SignUpController(yupSchemaValidator, createAccountUseCase)
    return makeLogControllerDecorator(signUpController)
}
