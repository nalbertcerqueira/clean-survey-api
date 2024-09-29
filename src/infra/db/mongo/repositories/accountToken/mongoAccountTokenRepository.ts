import { mongoHelper } from "@infra/db/mongo/config/mongodb-config"
import { FindTokenByIdRepository, UpdateTokenRepository, MongoTokenModel } from "./protocols"
import { IAccountToken } from "@domain/entities/accountToken"

export class MongoAccountTokenRepository implements UpdateTokenRepository, FindTokenByIdRepository {
    public async findByAccountId(
        data: Pick<IAccountToken, "accountId" | "name">
    ): Promise<string | null> {
        await mongoHelper.connect()

        const { accountId, name } = data
        const tokenCollection = mongoHelper.db.collection("accountTokens")
        const foundToken = await tokenCollection.findOne<MongoTokenModel>({
            accountId,
            tokenName: name
        })

        return foundToken ? foundToken.value : null
    }

    public async update(token: IAccountToken): Promise<void> {
        await mongoHelper.connect()

        const { accountId, name, value } = token
        const tokenCollection = mongoHelper.db.collection<MongoTokenModel>("accountTokens")
        await tokenCollection.findOneAndUpdate(
            { accountId, name },
            { $set: { value } },
            { upsert: true }
        )
    }
}
