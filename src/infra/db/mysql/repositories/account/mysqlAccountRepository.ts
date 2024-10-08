import { IAccount, IRole } from "@domain/entities/account"
import {
    AccountWithoutId,
    AddAccountRepository
} from "@domain/repositories/account/addAccountRepository"
import { Repository } from "typeorm"
import { mysqlDataSource } from "../../config"
import { AccountORMEntity } from "../../models/accountModel"
import { ulid, ulidToUUID, uuidToULID } from "ulidx"
import { FindAccountByEmailRepository } from "@domain/repositories/account/findAccountByEmailRepository"
import { FindAccountByIdRepository } from "@domain/repositories/account/findAccountByIdRepository"

export class MysqlAccountRepository
    implements AddAccountRepository, FindAccountByEmailRepository, FindAccountByIdRepository
{
    private readonly repository: Repository<AccountORMEntity>

    constructor() {
        this.repository = mysqlDataSource.getRepository(AccountORMEntity)
    }

    public async add(account: AccountWithoutId): Promise<IAccount> {
        const { name, email, password, role } = account
        const id = ulid()

        await this.repository
            .createQueryBuilder()
            .insert()
            .into(AccountORMEntity)
            .values([{ id: ulidToUUID(id), name, email, password, role }])
            .updateEntity(false)
            .execute()

        return { id, ...account }
    }

    public async findByEmail(email: string): Promise<IAccount | null> {
        const account: IAccount | null = await this.repository.findOne({
            select: { id: true, name: true, email: true, password: true, role: true },
            where: { email }
        })

        return account ? { ...account, id: uuidToULID(account.id) } : null
    }

    public async findById(id: string, role?: IRole): Promise<IAccount | null> {
        const account: IAccount | null = await this.repository.findOne({
            select: { id: true, name: true, email: true, password: true, role: true },
            where: { id: ulidToUUID(id), role }
        })

        return account ? { ...account, id } : null
    }
}
