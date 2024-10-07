import { createConnection, Connection } from "mysql2/promise"
import { DataSource, DataSourceOptions } from "typeorm"

export class MysqlDataSource extends DataSource {
    constructor(options: DataSourceOptions) {
        super(options)
    }

    public async initialize(): Promise<this> {
        await this.createDatabase()
        await super.initialize()
        return this
    }

    private async createDatabase(): Promise<void> {
        const temporaryConnection = await this.createTemporaryConnection()
        await temporaryConnection.query(`CREATE DATABASE IF NOT EXISTS ${process.env.DB_NAME}`)
        await temporaryConnection.end()
    }

    private async createTemporaryConnection(): Promise<Connection> {
        const connection = await createConnection({
            host: process.env.DB_HOST,
            port: parseInt(process.env.DB_PORT as string) || 3306,
            user: process.env.DB_USER,
            password: process.env.DB_PASSWORD
        })

        return connection
    }
}
