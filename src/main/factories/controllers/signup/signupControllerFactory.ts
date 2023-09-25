import { makeLogControllerDecorator } from "@main/factories/decorators/logDecoratorFactory"
import { MongoAccountRepository } from "@infra/db/mongo/repositories/account/mongoAccountRepository"
import { BcryptEncrypterService } from "@infra/services/bcryptEncrypterService"
import { YupSignUpValidator } from "@infra/validators/signup/yupSignUpValidator"
import { SignUpController } from "@presentation/controllers/signup/signUpController"
import { Controller } from "@presentation/protocols"
import { CreateAccountUseCase } from "@domain/usecases/account/createAccount/createAccountUseCase"

export function makeSignUpController(): Controller {
    const salt = 12

    const bcryptEncrypterService = new BcryptEncrypterService(salt)
    const mongoAccountRepository = new MongoAccountRepository()

    const yupSchemaValidator = new YupSignUpValidator()
    const createAccountUseCase = new CreateAccountUseCase(
        bcryptEncrypterService,
        mongoAccountRepository,
        mongoAccountRepository
    )

    const signUpController = new SignUpController(yupSchemaValidator, createAccountUseCase)
    return makeLogControllerDecorator(signUpController)
}
