import { mongoHelper } from "@infra/db/mongo/config/mongodb-config"
import { FindTokenByIdRepository, UpdateTokenRepository, MongoTokenModel } from "./protocols"

export class MongoAccountTokenRepository implements UpdateTokenRepository, FindTokenByIdRepository {
    async findByAccountId(accountId: string, tokenName: "accessToken"): Promise<string | null> {
        await mongoHelper.connect()

        const tokenCollection = mongoHelper.db.collection("accountTokens")
        const foundRegister = await tokenCollection.findOne<MongoTokenModel>({ accountId })

        if (foundRegister && foundRegister[`${tokenName}`]) {
            return foundRegister[`${tokenName}`]
        }
        return null
    }

    async update(accountId: string, token: string, tokenName: "accessToken"): Promise<void> {
        await mongoHelper.connect()

        const tokenCollection = mongoHelper.db.collection("accountTokens")
        await tokenCollection.findOneAndUpdate(
            { accountId },
            { $set: { [`${tokenName}`]: token } },
            { upsert: true }
        )
    }
}
