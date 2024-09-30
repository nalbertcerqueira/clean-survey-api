import { UpdateTokenRepository } from "@domain/repositories/token/updateTokenRepository"
import { mysqlDataSource } from "../../config"
import { AccountTokenORMEntity } from "../../models/accountTokenModel"
import { FindTokenByIdRepository } from "@domain/repositories/token/findTokenByIdRepository"
import { ulidToUUID } from "ulidx"
import { IAccountToken } from "@domain/entities/accountToken"

export class MysqlAccountTokenRepository implements UpdateTokenRepository, FindTokenByIdRepository {
    public async update(token: IAccountToken): Promise<void> {
        const tokenRepository = mysqlDataSource.dataSource.getRepository(AccountTokenORMEntity)

        const newAccountToken = new AccountTokenORMEntity()
        newAccountToken.accountId = ulidToUUID(token.accountId)
        newAccountToken.name = token.name
        newAccountToken.value = token.value

        await tokenRepository.save(newAccountToken, { reload: false })
    }

    public async findByAccountId(
        data: Pick<IAccountToken, "accountId" | "name">
    ): Promise<string | null> {
        const tokenRepository = mysqlDataSource.dataSource.getRepository(AccountTokenORMEntity)

        const { accountId, name } = data
        const token: IAccountToken | null = await tokenRepository.findOne({
            select: { value: true },
            where: { accountId: ulidToUUID(accountId), name }
        })

        return token ? token.value : null
    }
}
