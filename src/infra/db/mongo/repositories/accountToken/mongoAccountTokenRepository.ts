import { mongoHelper } from "@infra/db/mongo/config/mongodb-config"
import {
    FindTokenByIdRepository,
    UpdateTokenRepository,
    MongoTokenModel,
    TokenNames
} from "./protocols"

export class MongoAccountTokenRepository implements UpdateTokenRepository, FindTokenByIdRepository {
    public async findByAccountId(accountId: string, tokenName: TokenNames): Promise<string | null> {
        await mongoHelper.connect()

        const tokenCollection = mongoHelper.db.collection("accountTokens")
        const foundToken = await tokenCollection.findOne<MongoTokenModel>({
            accountId,
            tokenName
        })

        return foundToken ? foundToken.tokenValue : null
    }

    public async update(accountId: string, token: string, tokenName: TokenNames): Promise<void> {
        await mongoHelper.connect()

        const tokenCollection = mongoHelper.db.collection("accountTokens")
        await tokenCollection.findOneAndUpdate(
            { accountId, tokenName },
            { $set: { tokenValue: token } },
            { upsert: true }
        )
    }
}
