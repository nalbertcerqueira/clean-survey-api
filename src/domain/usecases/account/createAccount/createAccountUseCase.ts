import { CreateAccountInputDTO, CreateAccountOutputDTO } from "./createAccountDTOs"
import { AddAccountRepository } from "@domain/repositories/account/addAccountRepository"
import { FindAccountByEmailRepository } from "@domain/repositories/account/findAccountByEmailRepository"
import { HashService } from "@domain/services/encryption/hashService"

//Caso de uso para criar uma conta para um usuário
export class CreateAccountUseCase {
    constructor(
        private readonly hasher: HashService,
        private readonly addAccountRepository: AddAccountRepository,
        private readonly findAccountRepository: FindAccountByEmailRepository
    ) {}

    public async execute(rawAccount: CreateAccountInputDTO): Promise<CreateAccountOutputDTO> {
        const foundAccount = await this.findAccountRepository.findByEmail(rawAccount.email)

        if (!foundAccount) {
            const hashedPassword = await this.hasher.hash(rawAccount.password)

            const { id, name, email, role } = await this.addAccountRepository.add({
                name: rawAccount.name,
                email: rawAccount.email,
                role: rawAccount.role || "user",
                password: hashedPassword
            })

            return { id, name, email, role }
        }

        return null
    }
}
