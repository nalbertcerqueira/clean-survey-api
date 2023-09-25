import { LogErrorRepository, MongoErrorModel } from "./protocols"
import { mongoHelper } from "@infra/db/mongo/config/mongodb-config"

export class MongoErrorRepository implements LogErrorRepository {
    async log(errorStack: string): Promise<void> {
        await mongoHelper.connect()

        const errorCollection = mongoHelper.db.collection("errorLogs")
        const error: Omit<MongoErrorModel, "_id"> = { stack: errorStack, createdAt: Date.now() }

        await errorCollection.insertOne({ ...error })
    }
}
