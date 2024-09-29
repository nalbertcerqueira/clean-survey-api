import { AuthenticationInputDTO } from "./authenticationDTOs"
import { FindAccountByEmailRepository } from "@domain/repositories/account/findAccountByEmailRepository"
import { UpdateTokenRepository } from "@domain/repositories/token/updateTokenRepository"
import { HashCompareService } from "@domain/services/encryption/hashCompareService"
import { TokenGeneratorService } from "@domain/services/token/tokenGeneratorService"

//Caso de uso para autenticar o usuário durante o processo de login
export class AuthenticationUseCase {
    constructor(
        private readonly findAccountRepository: FindAccountByEmailRepository,
        private readonly updateTokenRepository: UpdateTokenRepository,
        private readonly hashComparer: HashCompareService,
        private readonly tokenGenerator: TokenGeneratorService
    ) {}

    public async execute(authData: AuthenticationInputDTO): Promise<string | null> {
        const { email, password } = authData
        const foundAccount = await this.findAccountRepository.findByEmail(email)

        if (foundAccount) {
            const validPassword = await this.hashComparer.compare(password, foundAccount.password)

            if (validPassword) {
                const accessToken = await this.tokenGenerator.generate(
                    foundAccount.id,
                    foundAccount.role
                )
                await this.updateTokenRepository.update({
                    accountId: foundAccount.id,
                    name: "accessToken",
                    value: accessToken
                })

                return accessToken
            }
        }

        return null
    }
}
