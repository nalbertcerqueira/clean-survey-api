import dotenv from "dotenv"
import * as schemas from "./validators"
import { Db, MongoClient, MongoClientOptions, ServerApiVersion } from "mongodb"

dotenv.config()

//Helper para auxiliar na utilização do mongodb nos repositórios
class MongoHelper {
    public readonly client: MongoClient
    public readonly db: Db
    private isConnected: boolean = false

    constructor(client: MongoClient, dbName: string) {
        this.client = client
        this.db = this.client.db(dbName)
    }

    public async connect(): Promise<void> {
        if (this.isConnected) return

        this.clearListeners()
        this.addListeners()

        try {
            await this.client.connect()
            await this.createCollections()
            this.isConnected = true
        } catch (error: any) {
            console.error(error.message)
            this.client.close()
            this.clearListeners()
            this.isConnected = false
            process.exit(1)
        }
    }

    private clearListeners(): void {
        this.client.removeAllListeners("open")
        this.client.removeAllListeners("close")
    }

    private addListeners(): void {
        this.client.on("open", () => {
            console.log("mongodb connected with success!")
        })

        this.client.on("close", () => {
            console.log("mongodb connection closed!")
            this.isConnected = false
        })
    }

    private async createCollections(): Promise<void> {
        try {
            await Promise.all([
                this.db.createCollection("accounts", { validator: schemas.accountMongoSchema }),
                this.db.createCollection("accountTokens", {
                    validator: schemas.tokenMongoSchema
                }),
                this.db.createCollection("surveys", { validator: schemas.surveyMongoSchema }),
                this.db.createCollection("surveyResults", {
                    validator: schemas.resultMongoSchema
                }),
                this.db.createCollection("errorLogs", { validator: schemas.errorLogMongoSchema })
            ])
        } catch {
            null
        }
    }
}

const options: MongoClientOptions = {
    serverApi: {
        version: ServerApiVersion.v1,
        strict: true,
        deprecationErrors: true
    }
}
const mongodbUrl = process.env.MONGODB_URL as string
const mongoClient = new MongoClient(mongodbUrl, options)
export const mongoHelper = new MongoHelper(mongoClient, "surveyApi")
