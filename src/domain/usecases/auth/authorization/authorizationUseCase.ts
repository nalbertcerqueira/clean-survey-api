import { IRole } from "@domain/entities/account"
import { FindAccountByIdRepository } from "@domain/repositories/account/findAccountByIdRepository"
import { FindTokenByIdRepository } from "@domain/repositories/token/findTokenByIdRepository"
import { TokenValidatorService } from "@domain/services/token/tokenValidatorService"

//Caso de uso para autorizar ou barrar a ação do usuário com base no seu token e role
export class AuthorizationUseCase {
    constructor(
        private readonly tokenValidator: TokenValidatorService,
        private readonly findTokenRepository: FindTokenByIdRepository,
        private readonly findAccountRepository: FindAccountByIdRepository
    ) {}

    public async execute(accessToken: string, role?: IRole): Promise<string | null> {
        const validationResult = await this.tokenValidator.validate(accessToken)

        if (validationResult) {
            const [foundToken, foundAccount] = await Promise.all([
                this.findTokenRepository.findByAccountId({
                    accountId: validationResult.id,
                    name: "accessToken"
                }),
                this.findAccountRepository.findById(validationResult.id, role)
            ])

            if (foundAccount && foundToken === accessToken) {
                return validationResult.id
            }
        }

        return null
    }
}
