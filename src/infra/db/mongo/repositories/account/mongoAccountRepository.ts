import { mongoHelper } from "@infra/db/mongo/config/mongodb-config"
import { ObjectId } from "mongodb"
import {
    AccountWithoutId,
    AddAccountRepository,
    FindAccountByEmailRepository,
    FindAccountByIdRepository,
    FindOptions,
    FoundAccount,
    IAccount,
    MongoAccountModel
} from "./protocols"

export class MongoAccountRepository
    implements AddAccountRepository, FindAccountByEmailRepository, FindAccountByIdRepository
{
    async add(account: AccountWithoutId): Promise<IAccount> {
        await mongoHelper.connect()

        const accountCollection = mongoHelper.db.collection("accounts")
        const newAccount: Omit<MongoAccountModel, "_id"> = {
            ...account,
            createdAt: Date.now(),
            updatedAt: Date.now()
        }
        const { insertedId } = await accountCollection.insertOne(
            { ...newAccount },
            { ignoreUndefined: true }
        )

        return { ...account, id: insertedId.toString() }
    }

    async findByEmail(email: string): Promise<IAccount | null> {
        await mongoHelper.connect()

        const accountCollection = mongoHelper.db.collection("accounts")
        const findOptions: FindOptions = { projection: { createdAt: 0, updatedAt: 0 } }

        const foundAccount = await accountCollection.findOne<FoundAccount>({ email }, findOptions)
        if (foundAccount) {
            const { _id, ...accountWithoutId } = foundAccount
            return { id: _id.toString(), ...accountWithoutId }
        }

        return null
    }

    async findById(id: string, role?: string): Promise<IAccount | null> {
        try {
            new ObjectId(id)
        } catch {
            return null
        }
        await mongoHelper.connect()

        const accountCollection = mongoHelper.db.collection("accounts")
        const query = { _id: new ObjectId(id), role: { $in: [role, "admin"] } }
        const findOptions: FindOptions = {
            projection: { createdAt: 0, updatedAt: 0 },
            ignoreUndefined: true
        }

        const foundAccount = await accountCollection.findOne<FoundAccount>(query, findOptions)
        if (foundAccount) {
            const { _id, ...accountWithoutId } = foundAccount
            return { id: _id.toString(), ...accountWithoutId }
        }

        return null
    }
}
