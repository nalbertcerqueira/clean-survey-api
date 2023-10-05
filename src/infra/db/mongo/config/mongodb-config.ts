import dotenv from "dotenv"
import { Db, MongoClient, MongoClientOptions, ServerApiVersion } from "mongodb"

dotenv.config()

//Helper para auxiliar a implementação do mongodb nos repositórios
class MongoHelper {
    private readonly client: MongoClient
    public readonly db: Db
    #isConnected: boolean = false

    constructor(client: MongoClient, dbName: string) {
        this.client = client
        this.db = this.client.db(dbName)
    }

    public async connect(): Promise<void> {
        if (this.#isConnected) return

        this.clearListeners()
        this.addListeners()

        try {
            await this.client.connect()
            this.#isConnected = true
        } catch (error: any) {
            console.error(error)
            this.client.close()
            this.clearListeners()
            this.#isConnected = false
            process.exit(1)
        }
    }

    private clearListeners(): void {
        this.client.removeAllListeners("connectionCreated")
        this.client.removeAllListeners("connectionClosed")
        this.client.removeAllListeners("open")
        this.client.removeAllListeners("close")
    }

    private addListeners(): void {
        this.client.on("connectionCreated", () => {
            console.log("mongodb connected with success!")
        })

        this.client.on("open", () => {
            console.log("mongodb connected with success!")
        })

        this.client.on("connectionClosed", () => {
            console.log("mongodb connection closed!")
            this.#isConnected = false
        })

        this.client.on("close", () => {
            console.log("mongodb connection closed!")
            this.#isConnected = false
        })
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
