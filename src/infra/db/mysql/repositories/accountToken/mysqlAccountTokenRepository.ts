import { UpdateTokenRepository } from "@domain/repositories/token/updateTokenRepository"
import { mysqlDataSource } from "../../config"
import { AccountTokenORMEntity } from "../../models/accountTokenModel"
import { FindTokenByIdRepository } from "@domain/repositories/token/findTokenByIdRepository"
import { ulidToUUID } from "ulidx"
import { IAccountToken } from "@domain/entities/accountToken"
import { Repository } from "typeorm"

export class MysqlAccountTokenRepository implements UpdateTokenRepository, FindTokenByIdRepository {
    private readonly repository: Repository<AccountTokenORMEntity>

    constructor() {
        this.repository = mysqlDataSource.getRepository(AccountTokenORMEntity)
    }

    public async update(token: IAccountToken): Promise<void> {
        const newAccountToken = new AccountTokenORMEntity()
        newAccountToken.accountId = ulidToUUID(token.accountId)
        newAccountToken.name = token.name
        newAccountToken.value = token.value

        await this.repository.save(newAccountToken, { reload: false })
    }

    public async findByAccountId(
        data: Pick<IAccountToken, "accountId" | "name">
    ): Promise<string | null> {
        const { accountId, name } = data
        const token: IAccountToken | null = await this.repository.findOne({
            select: { value: true },
            where: { accountId: ulidToUUID(accountId), name }
        })

        return token ? token.value : null
    }
}
